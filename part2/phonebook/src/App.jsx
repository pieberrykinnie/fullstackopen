import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

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

const DeleteButton = ({ toDelete, deletePerson }) => (
  <button type='button' onClick={() => deletePerson(toDelete)}>{'delete'}</button>
)

const Person = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} {' '}
    <DeleteButton toDelete={person.id} deletePerson={deletePerson} />
  </div>
)

const Persons = ({ persons, filter, deletePerson }) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().indexOf(filter) > -1)
      .map(person => (
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    phonebook
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
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
      phonebook
        .add({
          name: newName,
          number: newNumber,
        }).then(newPerson => {
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (confirm(`Delete ${personToDelete.name} ?`)) {
      phonebook
        .deleteOne(personToDelete.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
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

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
