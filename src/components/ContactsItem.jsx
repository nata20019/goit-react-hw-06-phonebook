import PropTypes from 'prop-types';

export const ContactsItem = ({ contact, onDelete }) => {
  const { name, number, id } = contact;

  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className="p-group" role="group" aria-label="Basic example">
      <ul className="w-list">
        <li className="list" key={id}>
          <p className="list-element">{name}</p>
          <span className="value">{number}</span>
        </li>
      </ul>
      <div className="d-flex">
        <button
          type="button"
          className="card-link btn-link"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
ContactsItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsItem;
