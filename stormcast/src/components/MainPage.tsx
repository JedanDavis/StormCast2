import React, { ChangeEvent } from 'react';
import { resultType } from './../types';
import SearchIcon from '@mui/icons-material/Search';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


type Props = {
    term: string;
    results: resultType[];
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onResultSelect: (result: resultType) => void;
    };

const MainPage = ({term, results, onInputChange, onSubmit, onResultSelect}:Props ): JSX.Element => {

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen w-full">
      <section className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg shadow-lg p-60">
        <h1 className="text-4xl font-black">
          Storm <span className="font-light text-blue-500">Cast <ThunderstormIcon /></span>
        </h1>
        <p className="text-xl font-light text-center mt-3">
          Enter the name of the location you want to check the weather for
        </p>

        <div className="relative flex mt-8">
          <input
            className="pl-8 flex-grow-1 h-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Type location..."
            value={term}
            onChange={onInputChange}
          />
          <ul className="absolute top-14 w-full ml-1 rounded-b-md">
            {results.map((result: resultType, index: number) => (
              <li key={result.name + '-' + index}>
                <button className="relative px-4 py-2 bg-gray-900 rounded-full text-white transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg mt-1" onClick={() => onResultSelect(result)}>
                  {result.name}
                </button>
              </li>
            ))}
          </ul>
          <a href="#_" className="relative inline-flex items-center justify-center p-3 h-12 overflow-hidden font-medium text-blue-500 
          transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group" onClick={onSubmit}>
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease"><SearchIcon /></span>
            <span className="relative invisible"><SearchIcon /></span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
