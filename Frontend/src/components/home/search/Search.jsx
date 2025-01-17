import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { GeoApiOptions, GEO_API_URL } from '../../../apis/Api.js';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      GeoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response, 'this is the rsponse');
        return response.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
        return [];
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    if (onSearchChange) {
      onSearchChange(searchData); // Notify parent component if a handler is provided
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <AsyncSelect
        className='react-select-container'
        classNamePrefix='react-select'
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleOnChange}
        placeholder='Search for a city...'
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#508D4E',
            boxShadow: 'none',
            '&:hover': { borderColor: '#508D4E' },
          }),
        }}
      />
    </div>
  );
};

export default Search;
