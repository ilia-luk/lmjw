// =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
// => LMJW (POC) - enforces continues delivery of quality software,
//    while keeping your developer sane and happy.
// =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
// ==================================
// => DEPENDENCIES
// ==================================
const colors = require('colors');
const readline = require('readline');


// ==================================
// => HELPERS
// ==================================
// readline interdace creation.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// checks if value type is a number and return bool.
const isNumber = value => typeof value === 'number';

// if value not number throw error, otherwise return value.
const valueValidator = value => {
  return !isNumber(value) ?
    console.error(`expected a value of type 'number', instead got: ${value}`) : value;
};

// sums up accepted type and return it for next iteration.
const valueReducer = (acc, [_, entryValue]) => valueValidator(entryValue) + acc;

// enforce two dimensional array structure for accepted types.
// returns sum of all values in field.
const foldFieldToValue = (field) => {
  const keychain = isNumber(field) ?
    [['_' , field]] : Object.entries(field);
  return keychain.reduce(valueReducer, 0);
};

// sums up field and return result for next iteration.
const foldFieldToValueReducer = (acc, [_, field]) => foldFieldToValue(field) + acc;

// returns sum of list values.
const foldListToValue = list => Object.entries(list).reduce(foldFieldToValueReducer, 0);

// subtracts Int by summed list and returns result.
const subtractByList = (x, list) =>  x - foldListToValue(list);


// ==================================
// => MAIN
// ==================================
// =1= first argument: developer object with "dailyRoutineTimes" key representing time spent not coding,
//     realistic avrage times list of daily activities which is not directly related to producing lines of code.
//     this argument must be an object literal consisting of whatever keys and the following types as values:
//     -- single dimensional array of integers,
//     -- integer,
//     -- object(nesting not supported) of integer type value of keys.
// =2= (optional) second argument: company timings policy, accepts the following settings:
//     -- dailyWorkHours: daily work hours. (default = 9)
//     -- singleSprintRunInDays: amount of days in single sprint, default of 10 days represents the recomended 2 weeks sprint cycle. (default = 10)
//     -- tasksPerDay: minimum required tasks per day for efficenly analyse developer performence per quarter. (default = 2, 'design-thinking metodology' recommendation)
const init = (developer, overrideDefaultCompanyPolicy) => {
  const companyPolicy = {
    dailyWorkHours: 9 || overrideDefaultCompanyPolicy.dailyWorkHours,
    singleSprintRunInDays: 10 || overrideDefaultCompanyPolicy.singleSprintRunInDays,
    tasksPerDay: 2 || overrideDefaultCompanyPolicy.tasksPerDay,
  };
  const hoursInDayCoding = subtractByList(companyPolicy.dailyWorkHours, developer.dailyRoutineTimes); 
  const hoursForSingleTask = (hoursInDayCoding / companyPolicy.tasksPerDay);
  const expectedTasksPerSprint = companyPolicy.tasksPerDay * companyPolicy.singleSprintRunInDays;

  // INPUT: tasksUntilComplete -> total tasks until feature is done, each task represents
  // half-day of actual work. (half-day === 3 hours of potentially meaningfull work time with current settings)
  rl.question(`=?= How many tasks ${developer.name} left with to complete feature? `, (tasksUntilComplete) => {
    const featureDevelopTimeInHours = hoursForSingleTask * parseInt(tasksUntilComplete.trim(), 10);
    const featureDevelopTimeInDays = featureDevelopTimeInHours / hoursInDayCoding;
    const featureDevelopTimeInSprints = featureDevelopTimeInDays / companyPolicy.singleSprintRunInDays;
    const featureDevelopTimeInSprintsTimesThree = featureDevelopTimeInSprints * 3; // accounts for "double by 3 your initial estimation" practice.
    rl.prompt(); console.log(`After taking ${developer.name}'s daily avrage time spent routine we got the following results:`.blue);
    rl.prompt(); console.log(`Input: [${tasksUntilComplete.trim().yellow}] tasks`);
    rl.prompt(); console.log(`Feature is estimated to take betwen [${featureDevelopTimeInSprints.toFixed(2).yellow}] to [${featureDevelopTimeInSprintsTimesThree.toFixed(2).yellow}] sprints.`);
    rl.prompt(); console.log(`Daily goal should be enforced to: [${companyPolicy.tasksPerDay.toFixed(2).yellow}] tasks per day.`);
    rl.prompt(); console.log(`Estimation time should be scoped to: [${hoursForSingleTask.toFixed(2).yellow}] hours per task.`);
    rl.prompt(); console.log(`Developer (${developer.name}) should mentaly grasp a single ticket as "I think I can do this in [${hoursForSingleTask.toFixed(2).yellow}] hour/s"`);
    rl.close();
  });
  rl.on('close', () => {
    rl.prompt(); console.log(
      `Please check the source code in "./lmjw.js" and help me improve it, for the sake of us all.`.blue
    );
    rl.prompt(); console.log(`Have a great day!`.blue)
    process.exit(0);
  });
};


// ==================================
// => EXPORT
// ==================================
module.exports = init;
