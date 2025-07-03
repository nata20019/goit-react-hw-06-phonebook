import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  return (
    <section className="section">
      <h2 className="title">{title}</h2>
      {children}
    </section>
  );
};
Section.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Section;
