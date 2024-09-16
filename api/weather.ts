import { BASE_URL } from "./constants";


export interface Weather {
    coord: {
        lat: number,
        lon: number,
    },
    weather: WeatherCondition[],
    base: any,
    main: {
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number,
        sea_level: number,
        grnd_level: number,
    },
    visibility: number, // always meters
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    rain?: {
        "1h": number,
        "3h": number,
    },
    snow?: {
        "1h": number,
        "3h": number,
    },
    dt: number // unix utc timestamp of update time
    sys: {
        country: string,
        sunrise: number // unix utc
        sunset: number // unix utc
    },
    name: string
}

export interface WeatherCondition {
    id: number,
    main: string,
    description: string,
    icon: string
}

export async function weatherByCoordinate(appid: string, lat: string, lon: string, units: string = "imperial"): Promise<Weather> {
    const params: URLSearchParams = new URLSearchParams({
        lat,
        lon,
        units,
        appid
    });
    return weather(params);
}

export async function weatherByCity(appid: string, search: string, units: string): Promise<Weather> {
    const params: URLSearchParams = new URLSearchParams({
        q: search,
        appid,
        units
    });
    return weather(params);
}

export async function weatherByZip(appid: string, search: string, units: string): Promise<Weather> {
    const params: URLSearchParams = new URLSearchParams({
        zip: search,
        appid,
        units
    });
    return weather(params);
}

export async function weather(params: URLSearchParams): Promise<Weather> {
    const resource: URL = new URL(`data/2.5/weather?${params.toString()}`, BASE_URL);
    const response = await fetch(resource.toString(), {
        method: "GET", 
    });
    return response.json();
}