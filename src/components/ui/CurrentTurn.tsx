import { Turn } from "../../interfaces";

import iconO from "../../assets/circle-svgrepo-com.svg";
import iconX from "../../assets/close-svgrepo-com_white.svg";

interface Props {
  turn: Turn;
}

export const CurrentTurn: React.FC<Props> = ({ turn }) => {
  return (
    <section className="mt-5">
      <h3 className="text-center font-semibold text-lg my-4">Turno</h3>
      <div className="flex gap-2">
        <div
          className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-md border-white ease-linear duration-300 ${
            turn === "X" ? "bg-[rgb(53,191,234)]" : ""
          }`}
        >
          <figure className="w-10 h-10">
            <img src={iconX} alt="Icon O" />
          </figure>
        </div>
        <div
          className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-md border-white ease-linear duration-300 ${
            turn === "O" ? "bg-[rgb(53,191,234)]" : ""
          }`}
        >
          <figure className="w-10 h-10">
            <img src={iconO} alt="Icon O" />
          </figure>
        </div>
      </div>
    </section>
  );
};
