import { Weather } from '../api/weather';
import { UNIT } from '../menu/standard-questions';



export function prettyWeather(weather: Weather, units: UNIT): string {
    return `Weather in ${weather.name}, ${weather.sys.country}
${weather.main.temp} ${temperatureUnitLabel(units)} 
    (feels like ${weather.main.feels_like} ${temperatureUnitLabel(units)})
${prettyWeatherConditions(weather)}
${prettyWind(weather, units)} winds
${prettyHumidity(weather)} humidity
${prettyRain(weather)}
${prettySnow(weather)}
`;
}

function prettyWeatherConditions(weather: Weather): string {
    return weather.weather.map(condition => condition.description).join('\n');
}

function prettyWind(weather: Weather, units: UNIT): string {
    return `${weather.wind.speed} ${windUnitLabel(units)}`
}

function windUnitLabel(units: UNIT): string {
    switch (units) {
        case UNIT.IMPERIAL:
            return "mph";
        case UNIT.STANDARD:
            return "m/s";
        case UNIT.METRIC:
            return "m/s";
    }
}

function prettyHumidity(weather: Weather): string {
    return weather.main.humidity + "%"
}

function prettyRain(weather: Weather): string {
    if (!weather.rain) {
        return "It hasn't rained recently."
    }
    return `It rained ${weather.rain["1h"]} mm in the past hour.`
}

function prettySnow(weather: Weather): string {
    if (!weather.snow) {
        return "It hasn't snowed recently."
    }
    return `It snowed ${weather.snow["1h"]} mm in the past hour.`
}

function temperatureUnitLabel(units: UNIT) {
    switch (units) {
        case UNIT.IMPERIAL:
            return "°F";
        case UNIT.STANDARD:
            return "°K";
        case UNIT.METRIC:
            return "°C";
    }
}