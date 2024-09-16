import * as inquirer from "@inquirer/prompts";
import { COUNTRY } from "../lib/constants";

export enum UNIT {
    STANDARD = "standard",
    IMPERIAL = "imperial",
    METRIC = "metric",
}

export async function units(): Promise<UNIT> {
    return inquirer.select({
        message: "What units do you prefer?",
        choices: [
            {
                value: UNIT.IMPERIAL,
                name: "Imperial",
                description: "degrees Fahrenheit"
            },
            {
                value: UNIT.STANDARD,
                name: "Standard",
                description: "degrees Kelvin"
            },
            {
                value: UNIT.METRIC,
                name: "Metric",
                description: "degrees Celsius"
            }
        ]
    })
}

export async function coordinates(): Promise<[lat: number, lon: number]> {
    const lat = await inquirer.number({
        message: "Latitude",
        required: true,
        min: -90,
        max: 90,
        step: 'any'
    });
    const long = await inquirer.number({
        message: "Latitude",
        required: true,
        min: -180,
        max: 180,
        step: 'any'
    });

    return [lat!, long!]; // using ! assertion because required is true
}

export async function country() {
    let country: string = await inquirer.select({
        message: "Country",
        choices: [
            {
                value: COUNTRY.US,
                name: "United States"
            },
            {
                value: COUNTRY.CANADA,
                name: "Canada"
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
    if (country === "other") {
        country = await inquirer.input({
            message: "Enter your 2 letter ISO-3166 country code (or skip)",
            required: false,
            validate: (c) => c.length===2 || c === ""
        });
    }
    return country;
}