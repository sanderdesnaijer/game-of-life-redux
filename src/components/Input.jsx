// @flow
import * as React from 'react';
import { isValidHex } from '../helpers';

type Props = {
  value: string,
  onChange: (value: string) => void,
  label: string,
  validate: string,
  className: string,
};

type State = {
  value: string,
};

class Input extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget: HTMLInputElement);

    const { value } = event.currentTarget;
    const { validate } = this.props;

    this.setState({
      value,
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
    const className = `${this.props.className} input input--text`;
    return (
      <div className={className}>
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
