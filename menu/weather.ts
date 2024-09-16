import * as inquirer from "@inquirer/prompts";
import { menu as weatherByCoordinateMenu } from './weather-by-coordinate';
import { menu as weatherByCityMenu } from './weather-by-city';
import { menu as weatherByZipMenu } from './weather-by-zip';

enum SEARCH_TYPE {
    CITY_COUNTRY = "city-country",
    ZIP = "zip",
    COORDINATES = "coordinates"
}


export async function menu(apikey: string) {
    const type = await inquirer.select({
        message: "What information do you want to search by?",
        choices: [
            {
                value: SEARCH_TYPE.CITY_COUNTRY,
                name: "City and country"
            },
            {
                value: SEARCH_TYPE.ZIP,
                name: "Zip code"
            },
            {
                value: SEARCH_TYPE.COORDINATES,
                name: "Coordinates"
            }
        ]
    });
    switch (type) {
        case SEARCH_TYPE.COORDINATES:
            return weatherByCoordinateMenu(apikey);
        case SEARCH_TYPE.CITY_COUNTRY:
            return weatherByCityMenu(apikey);
        case SEARCH_TYPE.ZIP:
            return weatherByZipMenu(apikey);
    }
}

