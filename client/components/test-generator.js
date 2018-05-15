import React, {Component} from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import {postCodeToGenerator, updateCode} from '../store/'
import AceEditor from 'react-ace'
import Describe from './simplified/describe';
import AssertButton from './simplified/assert-button';
import Header from './simplified/header';
import 'brace/mode/java';
import 'brace/theme/monokai';


class TestGenerator extends Component {
	constructor() {
		super()
		this.state = {
			selectOne: '',
			selected: [],
			inputTest1: '',
			inputTest2: '',
			message: '',
			describe: ''
		}
	}

	handleClickAssert = (method) => {
		console.log(method)
		this.setState({
			selectOne: method
		})
	}

	sendFunctionToSandbox = (event) => {
		event.preventDefault();

	}

	runTest = async (event) => {
		event.preventDefault();
		const {selectOne, message, inputTest2, inputTest1, selected} = this.state
		const inputs = [inputTest1, inputTest2];

		const evalFunc = await this.props.postCodeToGenerator({input: this.props.generator})
		const evalAssert = await this.props.postCodeToGenerator({input: evalFunc.sandbox, assert: selectOne, itBlock: message, inputs})

		if (evalAssert.sandbox === `'${message}'`){
			const invokedFuncArr = this.props.generator.split('\n')
			let invokedFuncStr = invokedFuncArr[invokedFuncArr.length - 1]
			invokedFuncStr = invokedFuncStr.replace(/;/g, '')

			let itString =
`
	it('${message}',function(){
		assert.${selectOne}(${inputs.length ? invokedFuncStr + ',' + inputs.join(',').replace(/,\s*$/, '') : invokedFuncStr})
	})
`
			this.setState({
				selectOne: '',
				message: '',
				error: '',
				selected: [...selected, itString],
				inputTest1: '',
				inputTest2: '',
			})
		}
		else {
			this.setState({
				error: evalAssert
			})
		}
	}

	render () {
		if (!this.props.asserts) return <span />
		// const methods = Object.keys(assert);
		const {selected, selectOne, message, describe, inputTest1, inputTest2} = this.state
		const { asserts } = this.props
		const invokedFuncArr = this.props.generator.trim().split('\n')
		const invokedFuncStr = invokedFuncArr[invokedFuncArr.length - 1]
		return (
			<div className="layout-container">
				<Header />
				<div className="layout-body">
					<div className="left-side">
						<AceEditor
						    mode="javascript"
						    onChange={(event) => this.props.updateCode(event)}
						    theme="monokai"
						    readOnly={false}
						    value={this.props.generator}
						    name="ace"
						    height="350px"
						    width="350px"
						    editorProps={{$blockScrolling: true}}
						    style={{position: 'relative'}}
						/>
						<button
						type="clear"
						name="Clear"
						className="button-red"
						onClick={() => {this.props.updateCode('//Type functions here. Make sure to invoke your function! \n')}}
						>Clear Editor</button>
						<button
						type="cleartest"
						className="button-red"
						name="ClearTest"
						onClick={() => this.setState({selectOne: '', selected: [], inputTest1: '', inputTest2: '', message: '', describe: ''})}
						>Clear Tests</button>
					</div>
				</div>
				<div>
					<div className="right-side">
						<div className="test-block">
						<h5>Choose an assertion: </h5>
						<div className="display-assertions">
							{asserts.map(method => (
								selectOne === method.assert ?
								<div key={method.assert} className="assertion">
									<AssertButton active method={method.assert} onClick={() => this.handleClickAssert(method.assert)} />
								</div> :
								<div key={method.assert} className="assertion">
									<AssertButton method={method.assert} onClick={() => this.handleClickAssert(method.assert)} />
								</div>
							))}
						</div>
							<form onSubmit={this.runTest}>
								<label>
								    Describe message
								    <input
								    type="text"
								    name="describe"
								    onChange={ (event) => this.setState({describe: event.target.value})}
								    />
								</label>
								{selectOne &&
								<div>
								<label>
								    It message
								    <input
								    type="text"
								    name="message"
								    onChange={ (event) => this.setState({message: event.target.value})}
								    />
								</label>
								{asserts.find(el => el.assert === selectOne).args.slice(1).map((arg, i) =>
									(<div key={arg}>
										<label>
										    {arg}
										    <input
										    type="text"
										    value={this.state['inputTest' + (i + 1)]}
										    name={arg}
										    onChange={ (event) => this.setState({['inputTest' + (i + 1)]: event.target.value})}
										    />
										</label>
									</div>)
									)}
								<input
								className="button-blue"
								type="submit"
								name="Submit"
								/>
								</div>
								}
							</form>
							<Describe describe={describe} passedTests={selected} assertion={selectOne} actual={invokedFuncStr} input1={inputTest1} input2={inputTest2} it={message} />
						</div>
					</div>
				</div>
			</div>
			)
	}

}

const mapStateToProps = (state) => {
	return {
		generator: state.generator,
		asserts: state.asserts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToGenerator: sandbox => dispatch(postCodeToGenerator(sandbox)),
		updateCode: code => dispatch(updateCode(code))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TestGenerator)