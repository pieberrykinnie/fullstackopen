import { useState } from 'react'

const Person = ({ name, number }) => <div>{name} {number}</div>

const PersonList = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} name={person.name} number={person.number} />
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPersons = (event) => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length == 0) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleOnChangeNumber} />
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
