import axios from 'axios';

const URL = 'https://studies.cs.helsinki.fi/restcountries/';

const get = (searchKey) => (
  axios
    .get(URL + 'api/all')
    .then(countries => countries.data.filter(
      country => searchKey
        && country.name.common.toLowerCase().includes(searchKey.toLowerCase())
    ))
)

export default { get }
