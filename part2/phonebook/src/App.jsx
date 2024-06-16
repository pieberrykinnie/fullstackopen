import { useState } from 'react'

const Person = ({ name }) => <div>{name}</div>

const PersonList = ({ persons }) => (
  <div>
    {persons.map(person => <Person key={person.name} name={person.name} />)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  }

  const addPersons = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit" onClick={addPersons}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )
}

export default App
