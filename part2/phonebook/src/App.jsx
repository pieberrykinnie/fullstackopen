import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleOnChangeName = (event) => setNewName(event.target.value)
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value)
  const handleOnChangeFilter = (event) =>
    setFilter(event.target.value.toLowerCase())

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
