// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

export const STATE_ENUM = {
  NOT_SUBMITTED: 0,
  PENDING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const serverlessClient = config.createClient('serverless');

export default class FormState extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    children: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { submitted: STATE_ENUM.NOT_SUBMITTED };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  async handleSubmit(e) {
    e.preventDefault();

    const { submitted, ...formBody } = this.state;
    this.setState({ submitted: STATE_ENUM.PENDING });

    try {
      await serverlessClient.post(this.props.endpoint, formBody);
      this.setState({ submitted: STATE_ENUM.SUCCESS });
    } catch (error) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ submitted: STATE_ENUM.ERROR, error });
    }
  }

  render() {
    return this.props.children({
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      state: this.state,
    });
  }
}
