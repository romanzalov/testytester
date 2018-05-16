
const db = require('../server/db')
const {User, Level} = require('../server/db/models')

const levels = [
  {
    level: 0,
    title: 'Check All Systems',
    func: `const allSystemsCheck = true;`,
    objective: 'Check all Systems!',
    instructions: `Test the variable, 'allSystemsCheck', to be sure that it returns a boolean. Pick which Mocha assertion you'd like to use on the right side and it will appear in the test code block below. Some assertions require a second input to check your code against. For instance, 'typeoOf' accepts a string of what data type the tested code should return. Write tests until the NEXT LEVEL button lights up.`,
    itBlock: 'allSystemsCheck should be a boolean',
    tests: ['typeOf', 'isBoolean', 'isTrue', 'isFalse', 'isArray'],
    buttons: ['allSystemsCheck'],
    testToPass: 1,
    intro: `Ok cadets, since no one checked the critical functions of the our intergalactic rocket, I guess it's up to us to make sure things are going smoothly. We do unit testing here at Fullstack A-Cat-amy of Space. We test to check validity, make maintenance easier, for documentation, and for better understanding for those will read our code in the future. It looks like I'll have to be the one to teach you the Mocha.js framework and the Chai.js assertion library. Tests should be organized into groups using 'describe' blocks accepting a message and a callback. Individual tests should be the in the second argument of the describe block and start with 'it'. The 'it' block also takes a message as its first parameter and an anonymous function with an assertion as the second. Start by reading the code you're testing and making a game plan for how to test its validity. Let's jump in.`,
    outro: `Congrats, you've written your first Chai assertion! As you might have noticed, you have many options for how to test your code. 'isBoolean', 'isTrue', and 'typeOf' would all pass in these circumstances. But isTrue would be our best bet for this code block. 'isBoolean' and 'typeOf' are too general for these purposes. Try to be as specific as possible. Below are the tests you wrote and results of those assertions. Onto the next!`,
  },
  {
    level: 1,
    title: `All Systems are Go?`,
    func: `const allSystemCheck = true;
    const allSystemsAreGo = (allSystemCheck) => {
      if (allSystemCheck === true) {
        return 'Ready for liftoff!';
      }
      else {
        throw new Error('Systems Check failure!');
      }
    };`,
    objective: 'Check that all systems are go!',
    instructions: `Write a test for the function 'allSystemsAreGo' to check that its return value equals what we expect. Note that we must invoke our function inside of the test to check its return value!`,
    itBlock: `allSystemsAreGo returns "Ready for liftoff!"`,
    tests: ['strictEqual', 'equal', 'isTrue', 'typeOf', 'isString'],
    actual: 'allSystemsAreGo(allSystemCheck)',
    buttons: ['allSystemsAreGo(allSystemCheck)'],
    testToPass: 1,
    intro: `Now that all of our systems have been checked, it's time confirm that we're ready for liftoff. On the next level you'll see a function that accepts the variable from last level, 'allSystemCheck', as an argument. allSystemsAreGo() returns a string if true is passed into it, so try to pick an assertion that tests that we are, indeed, ready for liftoff. Ok, go on and test!`,
    outro: `READY FOR LIFTOFF! Purrrr! So now that that work is done, lets prepare to actually blast off into space. You my have noticed that 'equal' and 'strictEqual' perform a very similar check, but 'equal' can evaluate equality with type coersion (like '0' == 0), which is not really necessary in this particular tes4t. Now, let's launch our rocket so we can get on with the real work of space exploration!`,
  },
  {
    level: 2,
    title: `Launch Rocket!`,
    objective: 'launchRocket() completes the countdown to liftoff!',
    func:
    `const launchRocket = () => {
      const countDown = [];
      let counter = 10;
      while (counter > 0) {
        countDown.push(counter);
        counter--;
      }
      return countDown.concat('Liftoff!');
    };`,
    tests: ['equal', 'lengthOf', 'isArray', 'isNumber', 'isFunction', 'include'],
    instructions: `Pass 2 tests to successfully launch the rocket. Notice that launchRocket is a function that returns an array of numbers 10-1 and 'Liftoff!.  In this level, there will be multiple functions/variables you can use in writing your unit tests. The choice is yours...`,
    itBlock: `launchRocket() returns an array containing [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 'Liftoff!']`,
    testToPass: 2,
    buttons: ['launchRocket', 'launchRocket()'],
    intro: `Okay great, you can test a function. I don't know if you've ever been part of a catship crew, but it's pretty common in our industry to do a countdown before liftoff. Now that we know that all systems are go, let's make sure our countdown is functioning properly. Our countdown starts at 10 and counts down to 1 and that's a pretty essential step of preparing for liftoff on a catship. We have to make sure we're all on the schedule, ok? Synchronized watches can only get you so far. Let's write 2 passing tests to check launchRocket`,
    outro: `Nice! Wow, SPACE, am I right? It's nice out here, so far away from the high school bullies who doubted I could ever be an astroCat. *ahem* Now,our function only ever returns an array, so 'isArray' will definitely pass, but is that the best you can do? I'd wager that 'lengthOf', 'equal' or 'includes' are our better options for testing what our function specificity returns. But regardless, we've made it! We're floating along in our little tin can and preparing for some hardcore space exploration.`,
  },
  {
    level: 3,
    title: 'Meteor check!',
    objective: `meteorFrequency groups and counts all of the meteors in sensor range`,
    func: `const meteorFrequency = (meteors) => {
      return meteors.reduce((meteorsByType, type) => {
        if (type in meteorsByType) {
          meteorsByType[type]++;
        } else {
          meteorsByType[type] = 1;
        }
        return meteorsByType;
      }, {});
    };
    const meteorsInRange = ['Iron meteor', 'Iron meteor', 'Stone meteor', 'Stone meteor', 'Stoney-iron meteor', 'Stone meteor', 'Stone meteor', 'Stoney-iron meteor', 'Iron meteor', 'Undetermined meteor', 'Iron meteor', 'Iron meteor',
    ];
     `,
     tests: ['isObject', 'isOk', 'isArray', 'lengthOf', 'property', 'propertyVal'],
     buttons: ['meteors', 'mtrFrequency(meteorsInRange)'],
     instructions: `Pass 2 tests to check that the variable 'meteors' and the function 'meteorFrequency' are working properly! We use Array.prototype.reduce to iterate over the meteorsInRange array to return an object with a unique key name for each type of meteor we encounter and a value for how many we've seen. Cool! We are working with objects now, so you'll see some new assertion types, property and propertyVal.`,
    intro: `Finally we're flying. This is what it's all about... Now that the catship is airborne, let's do an analysis of our meteor sensors. It looks like there are mostly iron meteors floating around. Let's use tests to make sure our radar is actually storing the meteors in range and then automatically sorting them by type. Iron meteors are way more dense, so we do our best to avoid them. So, before we smash into a wall of iron meteors lets write at least three tests for our meteor analysis`,
    outro: `Look at you, mighty tester! You're really starting to pull your weight on the ship. I'm so pleased to know that our radar is functioning properly and we can navigate space without running into any meteors. The assertion 'property', checks to see if that given value is a property in the object is it is being called upon. 'propertyVal' does a similar, deeper check, searching for a particular key/value pair. In Javacscript, because objects are passed by reference, we have construct more precise tests than we do when testing primitives.`
  },
  {
    level: 10,
    title: 'Classy spacecraft of the 21st century',
    objective: 'Building a new spacecraft using ES6 Classes',
    func: `class Spacecraft {
      fly() {
        return 1;
      }
    }

    class Rocket extends Spacecraft {
      blastOff() {
        return 'blast off';
      }
    }

    class Catship extends Rocket {
      info() {
        if(Catship.prototype.fly()===1){
          return (
            'Time for the Catship to ' + Catship.prototype.blastOff() + '!'
          );
        }
      }
    }
    `,
    tests: ['equal', 'isString', 'isArray', 'isNumber', 'include', 'operator'],
    instructions: 'Pass 5 tests to successfully build the new Spacecraft',
    itBlock: 'info(), fly(), blastOff() tests',
    testToPass: 5,
    buttons: ['Catship.prototype.info()', 'Spacecraft.prototype.fly()', 'Rocket.prototype.blastOff()', 'Catship.prototype.info', 'Spacecraft.prototype.fly', 'Rocket.prototype.blastOff'],
    solutions: 'Catship: it remains true that Catship is an instance of Spacecraft, therefore they fly and blast off!',
    suggestedTests: ['isFunction,Catship.prototype.info', 'isString,Catship.prototype.info()', 'equal,Spacecraft.prototype.fly(),`they fly`'],
    intro: `Pop Quiz! We're here to test catship operations, obviously. So then, you should know the difference between a Spacecraft, a rocket and a catship. See the ES6 code and check if you know that the return statement would say.`,
  }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  await Level.bulkCreate(levels);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${levels.length} levels`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
