// @flow
import * as React from 'react';

type Props = {
  label?: string,
  icon?: string,
  onClick: () => void,
  disabled: boolean,
  active: boolean,
};

const Button = ({ label, icon, disabled, active, onClick }: Props) => (
  <div
    className={active ? 'input input--button active' : 'input input--button'}
  >
    <button onClick={onClick} disabled={disabled}>
      {icon ? <i className="material-icons">{icon}</i> : label}
    </button>
  </div>
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
