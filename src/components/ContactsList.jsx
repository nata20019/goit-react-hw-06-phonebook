import { ContactsItem } from './ContactsItem';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsBook.contacts);
  const filter = useSelector(state => state.contactsBook.filter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="p-group" role="group" aria-label="Basic example">
      <ul className="w-list">
        {filteredContacts.map(contact => (
          <ContactsItem
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;

// import { ContactsItem } from './ContactsItem';
// import PropTypes from 'prop-types';

// export const ContactsList = ({ contacts, onDelete }) => {
//   return (
//     <div className="p-group" role="group" aria-label="Basic example">
//       <ul className="w-list">
//         {contacts.map(contact => (
//           <ContactsItem
//             key={contact.id}
//             contact={contact}
//             onDelete={onDelete}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default ContactsList;
