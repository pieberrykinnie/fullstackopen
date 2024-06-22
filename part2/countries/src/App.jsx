import { useState, useEffect } from 'react';
import api from './services/api';
import weatherAPI from './services/weather';

const Search = ({ search, handleSearch }) => (
  <div>
    find countries <input value={search} onChange={handleSearch}></input>
  </div>
)

const Country = ({ name, showDetails }) => (
  <div>{name}<ShowDetailsButton name={name} showDetails={showDetails} /></div>
);

const ShowDetailsButton = ({ name, showDetails }) => (
  <button onClick={() => { showDetails(name) }}>show</button>
);

const CountryDetailed = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const getWeather = (city) => {
    weatherAPI.get(city).then(currWeather => { setWeather(currWeather) });
  }

  useEffect(() => { getWeather(country.capital[0]) }, []);

  const languages = [];

  for (let key in country.languages) {
    languages.push(country.languages[key]);
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <br />
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
      <CityWeather city={country.capital[0]} weather={weather} />
    </div>
  );
}

const CityWeather = ({ city, weather }) => {
  if (weather === null) return null;

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
}

const Countries = ({ countries, showDetails }) => {
  let result = '';

  if (countries) {
    if (countries.length > 10)
      result = 'Too many matches, specify another filter';
    else if (countries.length > 1) {
      result = countries.map(country => (
        <Country
          key={country.name.common}
          name={country.name.common}
          showDetails={showDetails}
        />
      ));
    } else {
      result = <CountryDetailed
        country={countries[0]}
      />;
    }
  }

  return <div>{result}</div>;
}

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(null);

  const handleSearch = (event) => {
    const searchKey = event.target.value;
    setSearch(searchKey);
    api.get(searchKey).then(countries => { setCountries(countries) });
  }

  const showDetails = (name) => {
    setCountries([countries.find(country => country.name.common === name)]);
  }

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries
        countries={countries}
        showDetails={showDetails}
      />
    </div>
  );
}

export default App;
