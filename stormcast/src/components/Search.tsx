import React, { ChangeEvent } from 'react'
import { resultType } from './../types'
import SearchIcon from '@mui/icons-material/Search'
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

type Props = {
    term: string
    results: resultType[]
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    onResultSelect: (result: resultType) => void
    onGeoLocation: () => void
    }
    const Search = ({term, results, onInputChange, onSubmit, onResultSelect, onGeoLocation}:Props ) => (
 
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
          <button className="relative px-4 py-2 bg-gray-900 rounded-full text-white transition-all hover:bg-yellow-400 transition duration-500  hover:shadow-lg mt-1" onClick={() => onResultSelect(result)}>
            {result.name}, {result.country}
          </button>
        </li>
      ))}
    </ul>
    <a href="#_" className="relative inline-flex items-center ms-2 justify-center p-3 h-12 overflow-hidden font-medium text-blue-500 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group" onClick={onSubmit}>
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease"><SearchIcon /></span>
      <span className="relative invisible"><SearchIcon /></span>
    </a> 
    <a href="#_" className="relative flex items-center justify-center w-12 h-12 overflow-hidden ms-3 font-medium text-blue-500 bg-blue-100 border border-blue-500 rounded-full shadow-inner group" onClick={onGeoLocation}>
  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 border-t-2 border-blue-500 group-hover:w-full ease"></span>
  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 border-b-2 border-blue-500 group-hover:w-full ease"></span>
  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-400 delay-100 bg-blue-500 group-hover:h-full ease"></span>
  <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-400 delay-200 bg-blue-500 group-hover:h-full ease"></span>
  <span className="absolute inset-0 w-full h-full duration-400 delay-300 bg-blue-500 opacity-0 group-hover:opacity-100"></span>
  <span className="relative transition-colors duration-400 delay-200 group-hover:text-white ease"><WhereToVoteIcon sx={{ fontSize: 28 }}/></span>
</a>

  </div>
    )
    export default Search


    