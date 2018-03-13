// @flow
import * as React from 'react';

type Props = {
  activeIcon: string,
  inActiveIcon: string,
  isActive: boolean,
  onClick: (isActive: boolean) => void,
  disabled?: boolean,
};

const ToggleButton = ({
  activeIcon,
  inActiveIcon,
  isActive,
  onClick,
  disabled,
}: Props) => {
  const clickBtn = () => {
    onClick(!isActive);
  };
  return (
    <div className="input input--button input--toggle">
      <button disabled={disabled} onClick={clickBtn}>
        <i className="material-icons">{isActive ? activeIcon : inActiveIcon}</i>
      </button>
    </div>
  );
};

export default ToggleButton;
