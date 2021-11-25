import { FunctionComponent } from "react";
import { Jokenpo } from "../../dto";
import "./game-card.component.css";
import { getJokenpoImage } from "../../dto";

type GameCardComponentType = {
  selected?: Jokenpo;
  label: string;
  win?: boolean | null;
};

export const GameCardComponent: FunctionComponent<GameCardComponentType> = ({
  selected,
  label,
  win,
  ...props
}) => {
  return (
    <div id="game-card" {...props}>
      <div id="game-card__move" className={cardState(win)}>
        <img
          src={`/assets/${getJokenpoImage(selected)}`}
          alt={`card_figure_${selected}`}
        />
      </div>
      <div id="game-card__label">
        <h6>{label}</h6>
      </div>
    </div>
  );
};

const cardState = (win: boolean | null | undefined) => {
  if (win === null || win === undefined) {
    return "idle";
  }
  return win ? "win" : "lose";
};
