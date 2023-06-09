import React, { ChangeEvent, useState } from 'react';
import { forecastType, resultType } from '../types';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { getSunTime, getFahrenheit } from '../helpers';
import Tile from './Tile';
import Search from './Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Props = {
    data: forecastType;
    term: string;
    results: resultType[];
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onResultSelect: (result: resultType) => void;
    onGeoLocation: () => void;
};

const Forecast = ({
    data,
    term,
    results,
    onInputChange,
    onSubmit,
    onResultSelect,
    onGeoLocation,
}: Props): JSX.Element => {
    const today = data.list[0];
    const [isCelsius, setIsCelsius] = useState(true);

    const visibilityInKm = today.visibility / 1000; // Convert visibility to kilometers
    const visibilityInMiles = (visibilityInKm * 0.62137119).toFixed(1); // Convert kilometers to miles and round to 1 decimal place
    const weatherinCelsius = Math.round(today.main.temp); // Round temperature to 1 decimal place
    const weatherinFahrenheit = Math.round(((today.main.temp * 9) / 5 + 32)); // Convert temperature to Fahrenheit and round to 1 decimal place
    const weatherTemp = isCelsius ? weatherinCelsius + '°C' : weatherinFahrenheit + '°F';

    const handleTempUnitChange = (_: ChangeEvent<{}>, newTempUnit: string | null) => {
        if (newTempUnit === 'Celcius') {
            setIsCelsius(true);
        } else if (newTempUnit === 'Fahrenheit') {
            setIsCelsius(false);
        }
    };

    return (
        <div>
            <div className="w-full md:max-w-[900px] absolute top-10 py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
                <section className="flex justify-between items-center">
                    <Search
                        term={term}
                        results={results}
                        onInputChange={onInputChange}
                        onResultSelect={onResultSelect}
                        onSubmit={onSubmit}
                        onGeoLocation={onGeoLocation}
                    />
                    <ToggleButtonGroup
                        value={isCelsius ? 'Celcius' : 'Fahrenheit'}
                        exclusive
                        onChange={handleTempUnitChange}
                        aria-label="Temperature Unit"
                    >
                        <ToggleButton value="Celcius" aria-label="Celcius">
                            °C
                        </ToggleButton>
                        <ToggleButton value="Fahrenheit" aria-label="Fahrenheit" text-color='blue'>
                            °F
                        </ToggleButton>
                    </ToggleButtonGroup>
                </section>
            </div>


            <div className="w-full md:max-w-[900px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
                <section className="text-center">
                    <h1 className="text-4xl font-black">
                        Storm <span className="font-light text-blue-500">Cast</span>
                    </h1>
                    <h2 className="text-2xl font-light text-center mt-3">
                        {data.name},
                        <span className="font-medium text-blue-500"> {data.country}</span>
                    </h2>
                    <h1 className="text-2xl font-extrabold">{weatherTemp}</h1>
                    <p className="text-sm">
                        High: {isCelsius ? Math.ceil(today.main.temp_max) : getFahrenheit(Math.ceil(today.main.temp_max))}° | Low: {isCelsius ? Math.ceil(today.main.temp_min) : getFahrenheit(Math.ceil(today.main.temp_min))}°
                    </p>
                </section>

                <section className="flex overflow-x-scroll mt-4 pb-2 mb-10">
                    {data.list.map((item, i) => (
                        <div key={i} className="inline-block text-center w-[50px] ms-3 flex-shrink-0">
                            <p className="text-sm">
                                {i === 0
                                    ? 'Now'
                                    : new Date(item.dt * 1000).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        hour12: true,
                                    })}
                            </p>
                            <img
                                alt={`weather-icon-${item.weather[0].description}`}
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            />
                            <p className="text-sm font-bold">{isCelsius ? Math.round(item.main.temp) : getFahrenheit(Math.round(item.main.temp))}°</p>
                        </div>
                    ))}
                </section>
                <div className="flex flex-wrap text-zinc-700">
                    <div className="w-[140px] text-xs font-bold hover:scale-110 transition duration-500 flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5 ms-10">
                        <WbTwilightIcon />
                        <h1 className="mt-5">Sunrise: {getSunTime(data.sunrise)}</h1>
                        <h1>Sunset: {getSunTime(data.sunset)}</h1>
                    </div>

                    <div className="ms-5">
                        <Tile
                            icon="feels"
                            title="Feels like"
                            info={isCelsius ? Math.round(today.main.feels_like) + '°C' : getFahrenheit(Math.round(today.main.feels_like)) + '°F'}
                            description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp)
                                    ? 'colder'
                                    : 'warmer'
                                }`}
                        />
                    </div>
                    <div className="ms-5">
                        <Tile icon="humidity" title="Humidity" info={today.main.humidity + '%'} description="" />
                    </div>
                    <div className="ms-5">
                        <Tile
                            icon="visibility"
                            title="Visibility"
                            info={visibilityInMiles + ' miles'}
                            description=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecast;
