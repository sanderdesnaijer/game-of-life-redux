// @flow
import * as React from 'react';

type Props = {
  label: string,
  icon: string,
  onClick: () => void,
};

const Button = ({ label, icon, onClick }: Props) => (
  <div className="input input--button">
    <button onClick={onClick}>
      {icon ? <i className="material-icons">{icon}</i> : label}
    </button>
  </div>
);

export default Button;
