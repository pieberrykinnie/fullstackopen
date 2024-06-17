import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleOnChangeFilter }) => (
  <div>
    filter shown with
    <input value={filter} onChange={handleOnChangeFilter} />
  </div>
)

const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleOnChangeName,
    handleOnChangeNumber,
    addPersons
  } = props

  return (
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
  )
}

const Person = ({ name, number }) => <div>{name} {number}</div>

const Persons = ({ persons, filter }) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().indexOf(filter) > -1)
      .map(person =>
        <Person key={person.id} name={person.name} number={person.number} />
      )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleOnChangeName = (event) => setNewName(event.target.value)
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value)
  const handleOnChangeFilter = (event) =>
    setFilter(event.target.value.toLowerCase())

  const addPersons = (event) => {
    event.preventDefault();
    if (!persons.find(person => person.name === newName)) {
      axios
        .post(
          'http://localhost:3001/persons',
          {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString()
          }
        ).then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleOnChangeFilter={handleOnChangeFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNumber={handleOnChangeNumber}
        addPersons={addPersons}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
