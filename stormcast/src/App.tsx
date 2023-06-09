import React, { ChangeEvent, useEffect, useState } from 'react';
import './styles.css'; // Path to your styles.css file
import { resultType, forecastType } from './types';
import SearchPage from './components/SearchPage';
import Forecast from './components/Forecast';

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<resultType|null>(null);// This state holds the input value selected from the search suggestions
  const [forecast, setForecast] = useState<forecastType|null>(null);// This state holds the forecast data
  // This state holds the search suggestions
  const [results, setResults] = useState<resultType[]>([]);

  // This function retrieves the search suggestions from the API
  const getSearchResults = (value: string) => {
    // Fetch the data from the API and use the trim method to remove any white spaces
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setResults(data));
  };

  const onResultSelect = (result: resultType) => {
    setCity(result);// Set the city state to the selected value
  };

  useEffect(() => {
    // Check if the city state is not null and call the getSearchResults function
    if (city !== null) {
      setTerm(city.name);
      setResults([]);
    }
  }, [city])
  
  //This function retrieves the forecast data from the API based on the selected city and stores it in the forecast state
  const getcityForecast = (city: resultType) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )
    .then((res) => res.json())
    .then((data) => {
      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }

      setForecast(forecastData)
      console.log(forecastData)

    })
    .catch((e) => console.log({ e }))
  }

  const onSubmit =() => {
    if (!city) return
    getcityForecast(city)

  }

  const onGeoLocation = () => {
    if (navigator.geolocation) {
      // Get the current location of the user and uses the coordinates to retrieve the forecast data from the API
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => res.json())
        .then((data) => {
          const forecastData = {
            ...data.city,
            list: data.list.slice(0, 16),
          }
    
          setForecast(forecastData)
          console.log(forecastData)
    
        })
        .catch((e) => console.log({ e }))
      })

    }
  }
  // This function handles the input change
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Set the term to the value of the input field and remove any white spaces to prevent unnecessary API calls
    const value = e.target.value.trim();
    setTerm(value);

    // Check if the value is not empty and call the getSearchResults function
    if (value !== '') {
      getSearchResults(value);
    }
  };

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen w-full">
      {forecast ? (
        <Forecast 
        data={forecast}
        term={term}
        results={results}
        onInputChange={onInputChange}
        onResultSelect={onResultSelect}
        onSubmit={onSubmit}
        onGeoLocation={onGeoLocation}
        />
        ):(
      <SearchPage
        term={term}
        results={results}
        onInputChange={onInputChange}
        onResultSelect={onResultSelect}
        onSubmit={onSubmit}
        onGeoLocation={onGeoLocation}
        ></SearchPage>)}
    </main>
  );
};

export default App;
