import * as inquirer from "@inquirer/prompts";
import { menu as reverseGeocoding } from "./menu/reverse-geocoding";
import { menu as weatherMenu } from "./menu/weather";

enum API_CALL {
    REVERSE_GEOCODING = "reverse-geocoding",
    WEATHER_BY_COORDINATE = "weather-by-coordinate",
}

async function main_menu() {
    const apikey = await get_api_key();
    const desired_call = await inquirer.select({
        message: "What API call would you like to make?",
        choices: [
            {
                name: "Current weather",
                value: API_CALL.WEATHER_BY_COORDINATE
            },
            {
                name: "Get locale information about coordinates",
                value: API_CALL.REVERSE_GEOCODING
            }
        ]
    });
    switch (desired_call) {
        case API_CALL.REVERSE_GEOCODING:
            await reverseGeocoding(apikey);
            break;
        case API_CALL.WEATHER_BY_COORDINATE:
            await weatherMenu(apikey);
            break;
        default: 
            console.log("Not sure how you broke that. Exiting.")
    }
}


async function get_api_key(): Promise<string> {
    if (process.env.OPENWEATHER_API_KEY) {
        return process.env.OPENWEATHER_API_KEY;
    }
    return inquirer.password({
        message: "Please enter your API key",
        mask: true
    });
}

main_menu();