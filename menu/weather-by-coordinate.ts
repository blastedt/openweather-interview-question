import * as inquirer from "@inquirer/prompts";
import { weatherByCoordinate } from "../api/weather";
import { prettyWeather } from "../lib/prettyprint-weather";
import * as standard from "./standard-questions";

export async function menu(apikey: string) {
    const lat = await inquirer.input({
        message: "Latitude",
        required: true,
        validate: (lat) => {
            const num = Number(lat)
            return (!isNaN(num) && num >= -90 && num <= 90) || "Enter a number from -90 to 90."
        }
    });
    const long = await inquirer.input({
        message: "Longitude",
        required: true,
        validate: (long) => {
            const num = Number(long)
            return (!isNaN(num) && num >= -180 && num <= 180) || "Enter a number from -180 to 180."
        }
    });

    const units = await standard.units();

    const weather = await weatherByCoordinate(apikey, lat, long, units);
    console.log(prettyWeather(weather, units));
}
