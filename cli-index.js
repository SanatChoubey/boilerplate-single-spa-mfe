import { input } from '@inquirer/prompts';
import fs from 'fs';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import shell from 'shelljs';

// first ask for project name:
const projectName = await input({ message: 'Enter your project name:' });
console.log('PROJECT NAME:', chalk.bgGreenBright(projectName))

// Ask for Organization name: which will we used in craco file...
const orgName = await input({message: 'Please Enter Organization name:'})

const spinner = createSpinner('Loading Package JSON').start()
spinner.success()
const packageJson  = fs.readFileSync('./package.json', { encoding: 'utf8', flag: 'r' });

const parsePackageJson = JSON.parse(packageJson);
parsePackageJson.name = projectName;
// Set all your scripts which are required... 
parsePackageJson.scripts = {
    ...parsePackageJson.scripts,
    boilerplate: "node cli-index.js",
    lintFix: "eslint --fix"
}
// set all your dependencies
parsePackageJson.dependencies = {
    ...parsePackageJson.dependencies,
    "react-query": '^1',

}
//  craco setup 
const deleteSpinner = createSpinner('Remove Package JSON/ Update package JSON').start()
//  delete package.json to create new one which we have appended 
fs.unlinkSync('./package.json')
//  created package.json ...
// fs.writeFileSync('./package.json', JSON.stringify(parsePackageJson, null, 4), {encoding: 'utf-8', });
deleteSpinner.success()
// run shell script to install packages & delete all the packages related to cli
shell.chmod('u+x', './burnout.sh');
shell.exec("./burnout.sh")
// console.log('answer', chalk.blue(projectName),  parsePackageJson)