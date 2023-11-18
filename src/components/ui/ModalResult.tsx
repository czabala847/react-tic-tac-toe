import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";

import { TResult } from "../../interfaces";

import imageWin from "../../assets/undraw_party_re_nmwj.svg";
import imageLoser from "../../assets/undraw_feeling_blue_-4-b7q.svg";
import imageTie from "../../assets/undraw_balloons_re_8ymj.svg";

interface Props {
  showModal: boolean;
  result: TResult;
  closeModal: () => void;
}

export const ModalResult: React.FC<Props> = ({
  showModal,
  result,
  closeModal,
}) => {
  const resultData = useMemo(() => {
    switch (result) {
      case "win":
        return {
          title: "Felicidades!",
          message: "Has ganado esta partida, sigue disfrutando!",
          image: imageWin,
        };
      case "loser":
        return {
          title: "Perdiste",
          message: "Lo sentimos has perdido, puedes seguir jugando.",
          image: imageLoser,
        };

      default:
        return {
          title: "Empate!",
          message: "Has empatado contra la CPU, sigue disfrutando!",
          image: imageTie,
        };
    }
  }, [result]);

  useEffect(() => {
    const showConfetti = () => {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    };

    if (result === "win") {
      showConfetti();
    }
  }, [result]);

  if (!showModal) return null;

  return (
    <div className="fadeIn overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] w-full md:inset-0 h-full">
      <div
        className="relative p-4 w-full h-full flex justify-center items-center"
        style={{
          background: "rgba(0,0,0,0.8)",
        }}
      >
        <div className="text-slate-600 overflow-hidden relative flex flex-col items-center bg-white w-[90%] md:w-2/4 lg:w-2/5 rounded-md px-4 md:px-10 py-10">
          <div className="flex items-center gap-2">
            <figure className="w-2/5">
              <img
                className="w-full"
                src={resultData.image}
                alt={`Imagen ${result}`}
              />
            </figure>
            <div className="text-center">
              <h3 className="text-2xl font-semibold">{resultData.title}</h3>
              <p>{resultData.message}</p>
            </div>
          </div>

          <button
            className="px-5 py-1 rounded-3xl bg-[#027CA8] text-white mt-5"
            type="button"
            onClick={closeModal}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
