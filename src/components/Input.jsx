import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    max: 50,
    min: 0,
    type: 'number'
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
      const returnValue =
        this.props.type === 'number' ? parseInt(value, 0) : value;
      this.props.onChange(returnValue);
    }
  };

  render() {
    return (
      <div className="input">
        <span>{this.props.label}</span>
        <input
          type={this.props.type}
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Input;
