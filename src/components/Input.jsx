import * as React from 'react';
import PropTypes from 'prop-types';

import { isValidHex } from '../helpers';

class Input extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    validate: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  onChange = event => {
    const { value } = event.target;
    const { validate } = this.props;

    this.setState({
      value
    });

    if (validate && validate === 'hex') {
      if (!isValidHex(value)) {
        return;
      }
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <div className="input input--number">
        <span>{this.props.label}</span>
        <input
          type="text"
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Input;
