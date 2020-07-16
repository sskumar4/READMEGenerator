const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

async function main() {
    console.log(`Begin`);
    const userResponse = await inquirer

        .prompt([

        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },

        {
            type: "input",
            message: "What is your E-mail?",
            name: "E-mail"
        },
        {
            type: "input",
            message: "What is your Project Tittle?",
            name: "projectTittle"
        },

        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },

        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
            name: "installationProcess"

        },

        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instruction"
        },
        /*
                {
                    type: "input",
                    message: "Provide instructions examples for use.",
                    name: "instructionExample"
                }, */

        {
            type: 'list-input',
            name: 'License',
            message: 'Select a License ',
            choices: ['MIT',
                'Apache 2.0',
                'BSD',
                'GPLv3',
                'ISC'
            ]
        },
        /*
                {
                    type: "input",
                    message: "provide License url ",
                    name: "licenseUrl"
                }, */
        /*
                {
                    type: "input",
                    message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
                    name: "contributorsGitUserName"
                }, */

        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        }

    ]);

    console.log(`starting`);
    console.log(userResponse);
    const gitUsername = userResponse.username;
    const projectTittle = userResponse.projectTittle;
    const projectDescription = userResponse.projectDescription;

    const installationProcess = userResponse.installationProcess;

    const instruction = userResponse.instruction;

    const instructionExample = userResponse.instructionExample;

    const licenseName = userResponse.licenseName;

    const licenseUrl = userResponse.licenseUrl;

    const contributorUserNames = userResponse.contributorsGitUserName;

    const tests = userResponse.tests;

    // fetching data from git

    // user

    const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);

    const gitData = gitResponse.data;

    const gitName = gitData.login;

    const gitEmail = gitData.email;

    const gitlocation = gitData.location;

    const gitUrl = gitData.html_url;

    const gitProfileImage = gitData.avatar_url;

    // contributor
    /*
        const contributorUserNamesArray = contributorUserNames.split(",");

        console.log(contributorUserNamesArray);

        // const  = listOfContributorsUserNames.

        // contributorsGitUserName

        var resultContributor;

        for (i = 0; i < contributorUserNamesArray.length; i++) {

            var contributorsGitUserName = contributorUserNamesArray[i]

            const gitResponse2 = await axios.get(`https://api.github.com/users/${contributorsGitUserName}`);

            var gitContribuProfileImage = gitResponse2.data.avatar_url;

            var gitContribuUrl = gitResponse2.data.html_url;

            var gitContribuEmail = gitResponse2.data.email;

            var resultContributor = resultContributor + (`

                \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);

        }
    */
    var result = (`

# ${projectTittle} 

${projectDescription}

\n* [Installation](#Installation)

\n* [Instructions](#Instructions)

\n* [License](#License)

\n* [Contributors](#Contributors)

\n* [Author](#Author)

\n* [Tests](#Tests)



## Installation

${installationProcess}

## Instructions

${instruction}

\`\`\`

${instructionExample}

\`\`\`

## License 

This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details


## Tests

${tests}

## Author 

\n![ProfileImage](${gitProfileImage})

\n**${gitName}**

\nEmail: ${gitEmail}

\nLocation:${gitlocation}

\nGitHub: ${gitUrl}

`)

    var writeResult = fs.writeFileSync(path.join(__dirname, '../ReadMeGenerator', 'readMe.md'), result)

    console.log("file generated....")

}

main();