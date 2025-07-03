import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import { nanoid } from 'nanoid';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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
    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

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

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;

// export class ContactForm extends Component {
//   static propTypes = {
//     onAddContact: PropTypes.func.isRequired,
//   };
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onAddContact(this.state);
//     console.log(this.state);
//     this.setState({ name: '', number: '' });
//   };
//   render() {
//     const { name, number } = this.state;
//     const nameInputId = 'nameInput';
//     const numberInputId = 'numberInput';
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor={nameInputId} className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             id={nameInputId}
//             aria-describedby="emailHelp"
//             required
//             value={name}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor={numberInputId} className="form-label">
//             Number
//           </label>
//           <input
//             type="tel"
//             name="number"
//             className="form-control"
//             id={numberInputId}
//             required
//             value={number}
//             onChange={this.handleChange}
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={this.handleSubmit}
//         >
//           Add contact
//         </button>
//       </Form>
//     );
//   }
// }

// export default ContactForm;
