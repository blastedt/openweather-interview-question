import { BASE_URL } from "./constants";


export interface Locale {
    name: string;
    local_names: {
        [country: string]: string
    };
    lat: number,
    lon: number,
    country: string
}


export async function reverse_geocode(appid: string, lat: string, lon: string, limit: string = "5"): Promise<Locale[]> {
    const params: URLSearchParams = new URLSearchParams({
        lat,
        lon,
        limit,
        appid
    });
    const resource: URL = new URL(`geo/1.0/reverse?${params.toString()}`, BASE_URL);
    const response = await fetch(resource.toString(), {
        method: "GET", 
    });
    return response.json();
}

