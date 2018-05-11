import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Objective from './objective';
import Editor from './editor';
import Describe from './describe';
import AssertButton from './assert-button';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import { postCodeToSandbox, getLevelsThunk, setLevel } from '../../store';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOne: '',
      input1: '',
      input2: '',
    };
  }
  componentDidMount() {
    this.props.setLevelOnLoad(0); // req params
    this.props.getLevelsThunk();
  }

  handleClickAssert = (e, method) => {
    e.preventDefault();
    this.setState({
      selectOne: method,
    });
  };

  clearForm = () => {
    this.setState({
      selectOne: '',
      input1: '',
      input2: '',
      passing: false,
      testResponse: '',

    });
  };

  runTest = () => {
    const { selectOne, input1, input2 } = this.state;
    const inputs = [input1];
    const level = this.props.levels.find(lev => lev.level === Number(0)); // req params
    const { func, objective, itBlock, tests, actual, title } = level;
    console.log(actual)
    let sandbox = actual;
    if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
    if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

    this.props.postCodeToSandbox({ sandbox, level: 0 }) // req params
      .then(res => {
        let result = it(itBlock)(assert[selectOne])(res.sandbox, ...inputs);
        this.setState({
          responses: [result]
        })
        console.log(result)
        if (result === message) {
          let str = `
it('${message}',function(){
   assert.${selectOne}(${inputs[0]? actual + ',' + inputs.join(','): actual
  })
})
  `;
          this.setState({
            tests: [...this.state.tests, str],
          });
          this.clearForm();
        }
      })
      .catch(err => {
        console.log(err);
    })
  }
    render() {
    if (!this.props.levels.length) return <span />
    // CHANGE LEVEL ID TO Req params
    const thisLevel = this.props.levels.find(lev => lev.level === Number(0));
    const { level, func, objective, instructions, itBlock, tests, actual, title } = thisLevel;
    const { selectOne, input1 } = this.state;
    return (
      <div className="layout-container">
        <Header active={level} />
        <div className="layout-body">

          <div className="code-block">
            <Objective level={level} title={title} instructions={instructions} />
            <Editor func={func} />
          </div>

          <div className="chester-level">
            <div className="test-block">

              <div className="send-test">
                <div className="test-code"><h4>Test Code:</h4></div>
                <div className="clear-send">
                <button className="button-blue" onClick={this.clearForm}>Clear</button>
                <button className="button-red" onClick={this.runTest}>Run Test!</button>
                </div>
            </div>

              <Describe describe={objective} assertion={selectOne} actual={actual} input1={input1} it={itBlock} />

              <h5>Choose an assertion: </h5>
              <div className="display-assertions">
              {tests.map(method => (
                  selectOne === method ?
                  <div className="assertion" key={method}>
                    <AssertButton active method={method} onClick={e => this.handleClickAssert(e, method)} />
                  </div> :
                  <div className="assertion" key={method}>
                  <AssertButton method={method} onClick={e => this.handleClickAssert(e, method)} />
                  </div>
              ))}
              </div>
              </div>

          </div>

      </div>
    </div>
    );
  }
}

const mapState = state => ({
    level: state.level,
    levels: state.levels,
    sandbox: state.sandbox,
});

const mapDispatchToProps = dispatch => ({
    postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox)),
    getLevelsThunk: () => dispatch(getLevelsThunk()),
    setLevelOnLoad: level => dispatch(setLevel(level)),
});

export default connect(mapState, mapDispatchToProps)(Layout);
