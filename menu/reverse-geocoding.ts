import { Locale, reverse_geocode } from "../api/reverse-geocoding";
import * as inquirer from "@inquirer/prompts";
import * as standard from './standard-questions';

function prettyprint_locale_list(res: Locale[]): string {
    let result = "";
    for (let loc of res) {
        result += prettyprint_locale(loc);
        result += "\n";
    }
    return result;
}

function prettyprint_locale(locale: Locale): string {
    return `Name: ${locale.name}
Country: ${locale.country}
Latitude: ${locale.lat}
Longitude: ${locale.lon}
`;
}


export async function menu(apikey: string) {
    const [lat, long] = await standard.coordinates();
    const limit = await inquirer.input({
        message: "Maximum number of results",
        required: false,
        default: "5",
        validate: lim => {
            let num = Number(lim)
            return (!isNaN(num) && num >= 1 && num <= 300) || "Enter a number from 1 to 300.";
        }
    });

    const result = await reverse_geocode(apikey, lat.toString(), long.toString(), limit);

    console.log(prettyprint_locale_list(result))
}