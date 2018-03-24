// @flow
import React, { Component } from 'react';
import classNames from 'classnames';

class ToggleGroup extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.open,
    };
  }

  onClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    const icon = open ? 'arrow_drop_down' : 'arrow_drop_up';

    return (
      <div
        className={classNames('toggle-group', {
          active: open,
          'toggle-group--horizontal': this.props.align === 'horizontal',
          [this.props.className]: this.props.className,
        })}
      >
        <button className="button button--toggle" onClick={this.onClick}>
          <span>{this.props.title}</span>
          <i className="material-icons">{icon}</i>
        </button>
        <div className="toggle-group__content">{this.props.children}</div>
      </div>
    );
  }
}
export default ToggleGroup;
