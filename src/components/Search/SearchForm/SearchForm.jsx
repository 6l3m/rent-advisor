import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  zipCode: PropTypes.string,
  budget: PropTypes.string,
};

const defaultProps = {
  zipCode: '',
  budget: '',
};

export default function SearchForm(props) {
  return (
    <React.Fragment>
      
    </React.Fragment>
  );
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
