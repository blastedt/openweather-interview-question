# Running
You'll need to run `npm install` as a pre-requisite.

Afterwards, you can use `npm run run` to compile and run the app.

# API Key configuration

You'll need an API key; one is provided in the email sent to me by the company.  The app will ask for a key when you open it.

Set the environment variable `OPENWEATHER_API_KEY` to your API key to skip the API key prompt.

In production, this would come from a secrets manager.

This repository never had the key committed to it.

# Example inputs

The menu has some default options, PA and MO specifically since I'm in PA and the company is in MO.

I like McMurdo Station, AQ, because it might snow there (it's in Antarctica), and we're unlikely to see the snow output otherwise.

# Architecture

All API calls are in `./api`. 

All menu logic is in `index.ts` (for the starting menu) and in `./menu` (for submenus).

Weather display logic is in `./lib/prettyprint-weather`

# A note on testing

Most of this repository ended up being display logic, and many functions ended up being just calls to Inquirer.  Testing these functions felt a bit pointless since I'd just be testing that library.

On the other hand, the API call functions in `./api` should be tested before opening a PR to a production repo.


# OpenWeather's deprecated API

OpenWeather deprecated their direct geocoding API at some point in the past. It still functions fine, but they say it may go down in the future. I used it for this project because it's much simpler. In production code, or if I was taking a couple more days on this, I would first look up a city's coordinates using the non-deprecated geocoding features, then use those coordinates to make a weather API call.