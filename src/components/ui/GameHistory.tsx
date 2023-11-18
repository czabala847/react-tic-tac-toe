import { IUser } from "../../interfaces";

import iconO from "../../assets/circle-svgrepo-com.svg";
import iconX from "../../assets/close-svgrepo-com.svg";

interface Props {
  user: IUser;
}

export const GameHistory: React.FC<Props> = ({ user }) => {
  const { code, defeats, games, name, victories } = user;

  return (
    <section
      style={{
        borderColor: "rgba(255,255,255,0.2)",
      }}
      className="w-full border-b pb-4 mb-10"
    >
      <div className="flex justify-between  items-center">
        <div className="flex items-center gap-2">
          <div>
            <span className="text-xs">Código #{code}</span>
            <h3
              style={{ textShadow: "0px 1px 5px rgba(0,0,0,0.3)" }}
              className="text-3xl"
            >
              {name}
            </h3>
            <span className="text-slate-200">{victories} victorias</span>
          </div>
          <figure className="w-12 h-12">
            <img src={iconX} alt="Icon X" />
          </figure>
        </div>
        <div className="text-center">
          <span className="text-xl font-semibold text-slate-200">VS</span>
          <p>Partidas jugadas: {games}</p>
        </div>
        <div className="flex items-center gap-2">
          <figure className="w-12 h-12">
            <img src={iconO} alt="Icon O" />
          </figure>
          <div className="text-end">
            <h3
              style={{ textShadow: "0px 1px 5px rgba(0,0,0,0.3)" }}
              className="text-3xl"
            >
              CPU
            </h3>
            <span className="text-slate-200">{defeats} victorias</span>
          </div>
        </div>
      </div>
    </section>
  );
};
