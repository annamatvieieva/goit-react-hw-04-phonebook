import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const { name } = contact;
    const normalizeName = name.toLocaleLowerCase();
    const filter = ({ name }) => name.toLowerCase().includes(normalizeName);
    if (contacts.find(filter)) {
      return alert(`${name} is already in contacts`);
    } else {
      setContacts(prevcontacts => [...prevcontacts, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevcontacts =>
      prevcontacts.filter(({ id }) => id !== contactId)
    );
  };

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const normalizeFilter = filter.toLocaleLowerCase();
  const filterContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <>
      <GlobalStyle />
      <Box p={3}>
        <Box as="h1" mb={4}>
          Phonebook
        </Box>
        <ContactForm onSubmit={addContact} />
        <Box as="h2" mb={4}>
          Contacts
        </Box>
        <Filter value={filter} onChange={handleChange} />
        <ContactList contacts={filterContacts} onClick={deleteContact} />
      </Box>
    </>
  );
};
