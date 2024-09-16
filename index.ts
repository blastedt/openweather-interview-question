import inquirer from 'inquirer';

async function main_menu() {
    const answers = await inquirer.prompt([
        {
            type: "password",
            name: "apikey",
            message: "Please enter your API key."
        },
        {
            type: "list",
            name: "apicall",
            message: "What API call would you like to make?",
            choices: [
                "Reverse geocoding"
            ]
        }
    ]);
    console.log(answers)
}

main_menu();