import { resultType } from '../types';
import { useState, useEffect, ChangeEvent } from 'react';

const useForecast =() => {
    const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<resultType|null>(null);// This state holds the input value selected from the search suggestions
  const [forecast, setForecast] = useState<any>(null);// This state holds the forecast data for the selected city
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
  
  const getcityForecast = (city: resultType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=standard&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>{

      const forecastData = {
        ...data.city, list: data.list.slice(0, 5)}
        setForecast(forecastData);
      });

    }

  const onSubmit =() => {
    if (!city) return;
    getcityForecast(city);

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
  return {onInputChange, onSubmit, onResultSelect, results, term, forecast}
}
export default useForecast;