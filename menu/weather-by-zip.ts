import * as inquirer from "@inquirer/prompts";
import { weatherByZip } from "../api/weather";
import { prettyWeather } from "../lib/prettyprint-weather";
import * as standard from "./standard-questions";

export async function menu(apikey: string) {
    const zip: string = await inquirer.input({
        message: "ZIP Code",
        required: true,
    });
    const country: string = await standard.country();
    const units: standard.UNIT = await standard.units();
    let search = zip;
    if (country) search += `,${country}`;
    const weather = await weatherByZip(apikey, search, units);
    console.log(prettyWeather(weather, units));

}