import * as inquirer from "@inquirer/prompts";
import { weatherByCoordinate } from "../api/weather";
import { prettyWeather } from "../lib/prettyprint-weather";
import * as standard from "./standard-questions";

export async function menu(apikey: string) {
    const [lat, long] = await standard.coordinates();

    const units = await standard.units();

    const weather = await weatherByCoordinate(apikey, lat.toString(), long.toString(), units);
    console.log(prettyWeather(weather, units));
}
