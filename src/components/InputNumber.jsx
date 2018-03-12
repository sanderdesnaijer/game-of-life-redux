// @flow
import * as React from 'react';

type Props = {
  value: number,
  max: number,
  min: number,
  onChange: (value: number) => void,
  label: string
};

type State = {
  value: number
};

class InputNumber extends React.Component<Props, State> {
  static defaultProps = {
    max: 50,
    min: 0
  };

  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    (event.currentTarget: HTMLInputElement);

    const { value } = event.currentTarget;
    const { max, min } = this.props;
    const parsedValue = parseInt(value, 10);
    if (parsedValue > max || parsedValue < min) return;

    this.setState({
      value: parsedValue
    });

    if (this.props.onChange) {
      this.props.onChange(parsedValue);
    }
  };

  render() {
    return (
      <div className="input input--number">
        <span>{this.props.label}</span>
        <input
          type="number"
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InputNumber;
