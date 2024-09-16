import * as inquirer from "@inquirer/prompts";
import { weatherByCity } from "../api/weather";
import { COUNTRY, STATE as US_STATE } from "../lib/constants";
import { prettyWeather } from "../lib/prettyprint-weather";
import * as standard from "./standard-questions";

export async function menu(apikey: string) {
    const city: string = await inquirer.input({
        message: "City",
        required: true
    });
    const country: string = await standard.country();
    let state: string = ""
    if (country !== "") {
        state = country === COUNTRY.US ? await get_us_state() : "other";
        if (state === "other") {
            state = await inquirer.input({
                message: "Enter your 2 letter ISO-3166-2 state code (or skip)",
                required: false,
                validate: (s) => s.length===2 || s === ""
            });
        }
    }
    let search = city;
    if (state) search += `,${state}`;
    if (country) search += `,${country}`;
    const units = await standard.units();
    const weather = await weatherByCity(apikey, search, units);
    console.log(weather);
    console.log(prettyWeather(weather, units));
}


async function get_us_state() {
    return inquirer.select({
        message: "State",
        choices: [
            {
                value: US_STATE.PENNSYLVANIA,
                name: "Pennsylvania"
            },
            {
                value: US_STATE.MISSOURI,
                name: "Missouri"
            },
            {
                value: "other",
                name: "Other"
            },
            {
                value: "",
                name: "Skip"
            }
        ]
    });
}