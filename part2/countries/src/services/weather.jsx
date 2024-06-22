import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY;

const get = (city) => (
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)
    .then(result => result.data)
)

export default { get }
