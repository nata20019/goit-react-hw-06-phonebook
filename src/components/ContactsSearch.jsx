import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ContactsSearch = ({ filter, onFilterChange }) => {
  const searchInputId = nanoid();

  return (
    <div className="input-group mb-3">
      <label htmlFor={searchInputId} className="name-to-finde">
        Find contacts by name
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Search contact"
        id={searchInputId}
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};
ContactsSearch.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ContactsSearch;
