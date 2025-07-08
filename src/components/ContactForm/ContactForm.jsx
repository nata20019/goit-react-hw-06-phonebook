import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import Form from 'react-bootstrap/Form';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsBook.contacts);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  // nanoid використовується в contactsSlice.js, тут не потрібно
  const nameInputId = `name-${nanoid()}`;
  const numberInputId = `number-${nanoid()}`;

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor={nameInputId} className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id={nameInputId}
          aria-describedby="emailHelp"
          required
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor={numberInputId} className="form-label">
          Number
        </label>
        <input
          type="tel"
          name="number"
          className="form-control"
          id={numberInputId}
          required
          value={number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add contact
      </button>
    </Form>
  );
};

export default ContactForm;

// const ContactForm = ({ onAddContact }) => {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.target;
//     if (name === 'name') {
//       setName(value);
//     } else if (name === 'number') {
//       setNumber(value);
//     }
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     onAddContact({ name, number });
//     setName('');
//     setNumber('');
//   };

//   const nameInputId = nanoid();
//   const numberInputId = nanoid();

//   return (
//     <Form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor={nameInputId} className="form-label">
//           Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           className="form-control"
//           id={nameInputId}
//           aria-describedby="emailHelp"
//           required
//           value={name}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor={numberInputId} className="form-label">
//           Number
//         </label>
//         <input
//           type="tel"
//           name="number"
//           className="form-control"
//           id={numberInputId}
//           required
//           value={number}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Add contact
//       </button>
//     </Form>
//   );
// };

// ContactForm.propTypes = {
//   onAddContact: PropTypes.func.isRequired,
// };

// export default ContactForm;
