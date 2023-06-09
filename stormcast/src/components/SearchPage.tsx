import React, { ChangeEvent } from 'react'
import { resultType } from './../types'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import Search from './Search'


type Props = {
    term: string
    results: resultType[]
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    onResultSelect: (result: resultType) => void
    onGeoLocation: () => void
    }

const SearchPage = ({term, results, onInputChange, onSubmit, onResultSelect, onGeoLocation}:Props ) => (

  <section className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg shadow-lg p-60">
  <h1 className="text-4xl font-black">
    Storm <span className="font-light text-blue-500">Cast <ThunderstormIcon /></span>
  </h1>
  <p className="text-xl font-light text-center mt-3">
    Enter the name of the location you want to check the weather for
  </p>

  <Search term={term}
        results={results}
        onInputChange={onInputChange}
        onResultSelect={onResultSelect}
        onSubmit={onSubmit}
        onGeoLocation={onGeoLocation}/>
</section>
   
)

export default SearchPage