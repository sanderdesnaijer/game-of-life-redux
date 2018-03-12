// @flow
import * as React from 'react';

type Props = {
  activeIcon: string,
  inActiveIcon: string,
  isActive: boolean,
  onClick: (isActive: boolean) => void,
};

const ToggleButton = ({
  activeIcon,
  inActiveIcon,
  isActive,
  onClick,
}: Props) => {
  const clickBtn = () => {
    onClick(!isActive);
  };
  return (
    <div className="input input--button">
      <button onClick={clickBtn}>
        <i className="material-icons">{isActive ? activeIcon : inActiveIcon}</i>
      </button>
    </div>
  );
};

export default ToggleButton;
