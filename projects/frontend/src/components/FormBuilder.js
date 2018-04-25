// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import FormState, { STATE_ENUM } from './FormState';

const FormBuilder = ({ endpoint, form, pending, success, error }) => (
  <FormState endpoint={endpoint}>
    {props => {
      switch (props.state.submitted) {
        case STATE_ENUM.SUCCESS:
          return success({ ...props });

        case STATE_ENUM.ERROR:
          return error({ ...props });

        case STATE_ENUM.PENDING:
          return (pending || form)({ ...props });

        default:
          return form({ ...props });
      }
    }}
  </FormState>
);

FormBuilder.propTypes = {
  endpoint: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  form: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  pending: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  state: PropTypes.shape({
    submitted: PropTypes.bool,
  }),
  success: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default FormBuilder;
