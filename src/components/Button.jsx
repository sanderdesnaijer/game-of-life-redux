// @flow
import * as React from 'react';

type Props = {
  label?: string,
  icon?: string,
  onClick: () => void,
  disabled: boolean,
};

const Button = ({ label, icon, disabled, onClick }: Props) => (
  <div className="input input--button">
    <button onClick={onClick} disabled={disabled}>
      {icon ? <i className="material-icons">{icon}</i> : label}
    </button>
  </div>
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
