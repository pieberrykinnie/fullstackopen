import axios from "axios";

const URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(URL).then((response) => response.data);
};

const add = (newEntry) => {
  return axios.post(URL, newEntry).then((response) => response.data);
};

const deleteOne = (id) => {
  return axios.delete(URL + `/${id}`).then((response) => response.data);
};

const update = (updatedEntry) => {
  return axios
    .put(URL + `/${updatedEntry.id}`, updatedEntry)
    .then((response) => response.data);
};

export default { getAll, add, deleteOne, update };
