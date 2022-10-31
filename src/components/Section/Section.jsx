import PropTypes from 'prop-types';

export const Section = ({ title, children }) => {
  // render() {
  //   // const { title, children } = this.props;
  //   // console.log(this.props);
  return (
    <>
      <section title={title}>
        {title && <h2>{title}</h2>}
        {children}
      </section>
    </>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
