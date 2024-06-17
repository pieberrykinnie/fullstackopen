import { useState } from 'react';
import api from './services/api';

const Search = ({ search, handleSearch }) => (
  <div>
    find countries <input value={search} onChange={handleSearch}></input>
  </div>
)

const Country = ({ name }) => <div>{name}</div>;

const CountryDetailed = ({ country }) => {
  const languages = [];

  for (let key in country.languages) {
    languages.push(country.languages[key]);
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.join(', ')}</div>
      <div>area {country.area}</div>
      <br />
      <b>languages:</b>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
}

const Countries = ({ countries }) => {
  let result = '';

  if (countries) {
    if (countries.length > 10)
      result = 'Too many matches, specify another filter';
    else if (countries.length > 1) {
      result = countries.map(country => (
        <Country key={country.name.common} name={country.name.common} />
      ));
    } else
      result = <CountryDetailed country={countries[0]} />;
  }

  return <div>{result}</div>;
}

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(null);

  const handleSearch = (event) => {
    const searchKey = event.target.value;
    setSearch(searchKey);
    api.get(searchKey).then(countries => setCountries(countries));
  }

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
