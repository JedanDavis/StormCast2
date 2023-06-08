import React, { ChangeEvent, useEffect, useState } from 'react';
import './styles.css'; // Path to your styles.css file
import { resultType } from './types';
import MainPage from './components/MainPage';

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<resultType|null>(null);// This state holds the input value selected from the search suggestions

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
      .then((data) => console.log({ data }));
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

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen w-full">
      <MainPage 
        term={term}
        results={results}
        onInputChange={onInputChange}
        onResultSelect={onResultSelect}
        onSubmit={onSubmit}/>

    </main>
  );
};

export default App;
