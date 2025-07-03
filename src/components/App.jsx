import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactsSearch from './ContactsSearch';
import ContactsList from './ContactsList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      try {
        const parsedContacts = JSON.parse(savedContacts);
        return parsedContacts;
      } catch (error) {
        console.error('Failed to parse contacts from localStorage:', error);
        return [];
      }
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = useCallback(
    newContact => {
      const isExistingContact = contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      );

      if (isExistingContact) {
        alert(`${newContact.name} is already in contacts.`);
        return;
      }

      setContacts(prevContacts => [
        ...prevContacts,
        { id: nanoid(), ...newContact },
      ]);
    },
    [contacts]
  );

  const handleDelete = useCallback(id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  }, []);
  const handleFilterChange = useCallback(e => {
    setFilter(e.target.value);
  }, []);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        margin: 100,
      }}
    >
      <h1>React homework template</h1>
      <Section title="Phonebook">
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <ContactsSearch filter={filter} onFilterChange={handleFilterChange} />
        <ContactsList contacts={filteredContacts} onDelete={handleDelete} />
      </Section>
    </div>
  );
};

export default App;

// export class App extends Component  {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts) {
//       try {
//         const parsedContacts = JSON.parse(savedContacts);
//         this.setState({ contacts: parsedContacts });
//       } catch (error) {
//         console.error('Failed to parse contacts from localStorage:', error);
//         this.setState({ contacts: [] });
//       }
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleAddContact = newContact => {
//     if (
//       this.state.contacts.some(
//         contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
//       )
//     ) {
//       alert(`${newContact.name} is already in contacts.`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
//     }));
//   };

//   handleDelete = id => {
//     this.setState(prevState => {
//       const newContactsList = prevState.contacts.filter(
//         contact => contact.id !== id
//       );
//       return { contacts: newContactsList };
//     });
//   };

//   handleFilterChange = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     // const { contacts } = this.state;
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'block',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 20,
//           color: '#010101',
//           margin: 100,
//         }}
//       >
//         React homework template
//         <Section title="Phonebook">
//           <ContactForm onAddContact={this.handleAddContact} />
//         </Section>
//         <Section title="Contacts">
//           <ContactsSearch
//             filter={filter}
//             onFilterChange={this.handleFilterChange}
//           />
//           <ContactsList
//             contacts={filteredContacts}
//             onDelete={this.handleDelete}
//           />
//         </Section>
//       </div>
//     );
//   }
// }
