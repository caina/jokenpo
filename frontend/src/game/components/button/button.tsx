import { FunctionComponent } from "react";
import { Jokenpo } from "../../dto";
import { getJokenpoImage } from "../../dto";
import "./button.css";

type ButtonType = {
  onClick: () => void;
  icon?: Jokenpo;
  label?: string;
  active?: boolean;
};

export const Button: FunctionComponent<ButtonType> = ({
  icon,
  label,
  onClick,
  active,
  ...props
}) => {
  let cssClasses = label ? "label-button" : "icon-button";
  if (active) {
    cssClasses += " active";
  }

  return (
    <button
      onClick={() => onClick()}
      type="button"
      className={cssClasses}
      {...props}
    >
      {label ? label : <img src={`/assets/${getJokenpoImage(icon)}`} alt="" />}
    </button>
  );
};
