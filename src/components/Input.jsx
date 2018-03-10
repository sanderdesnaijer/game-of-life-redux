import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string
  };

  static defaultProps = {
    max: 6,
    min: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  onChange = event => {
    const { value } = event.target;
    const { max, min } = this.props;

    if (value > max || value < min) return;

    this.setState({
      value
    });

    if (this.props.onChange) {
      this.props.onChange(returnValue);
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
