const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");


// array of questions for user
const questions = [ 
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: (value) => {
      return value ? true : 'Please enter a project title';
    }
  },
  
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license:',
    choices: ['MIT', 'Apache 2.0', 'GNU v3.0', 'AGPL v3', 'MPL 2.0', 'Boost 1.0', 'none'],
    validate: (value) => {
      return value ? true : 'Please enter a value to continue';
    }
  },

  {
    type: "editor",
    name: "description",
    message: "Add description of your project:",
    validate: (value) => {
      const trimmedValue = value.trim();
      return trimmedValue !== '' ? true : 'Please enter a description to continue';
    },
  },

  {
    type: "confirm",
    name: "includeInstallation",
    message: "Include installation guidelines?",
  },
  {
    type: 'editor',
    name: 'installation',
    message: 'Add installation guidelines:',
    when(answers) {
      return answers.includeInstallation === true;
    },
    validate: (value) => {
      return value ? true : 'Please enter installation guidelines to continue';
    }
  },
  
  {
    type: 'editor',
    name: 'usage',
    message: 'Add usage guidelines:',
    validate: (value) => {
      return value ? true : 'Please enter usage guidelines to continue';
    }
  },
   
  {
    type: 'editor',
    name: 'contributors',
    message: 'Add contributors:',
    validate: (value) => {
      return value ? true : 'Please enter value to continue';
    }
  },

  {
    type: 'editor',
    name: 'tests',
    message: 'Add test guidelines:',
    validate: (value) => {
      return value ? true : 'Please enter value to continue';
    }
  },
 
  {
    type: 'input',
    name: 'github',
    message: 'Add GitHub username:',
    default: false, 
    when(answers) {
      return answers.includeInstallation === true;
    },
    validate(input) {
      const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
      return githubUsernameRegex.test(input) ? true : 'Please enter a valid GitHub username';
    },
  },
  
  {
    type: 'input',
    name: 'email',
    message: 'Add E-Mail:',
    when: (answers) => !answers.includeEmail,
    validate: (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input) ? true : 'Please enter a valid email address';
    },
  }
  
  
];


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Your README.md file written successfully!");
      }
    });
  }
  
  async function init() {
    try {
      const answers = await inquirer.prompt(questions);
      writeToFile("README.md", answers);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  init();
