import React from "react";

import iconO from "../../assets/circle-svgrepo-com.svg";
import iconX from "../../assets/close-svgrepo-com.svg";

interface Props {
  index: number;
  value: string;
  isWinning: boolean;
  onMarkUser: (index: number) => void;
}

export const BoardCell: React.FC<Props> = ({
  index,
  onMarkUser,
  value,
  isWinning,
}) => {
  return (
    <div
      className={`ease-linear duration-300 w-24 h-24 flex items-center justify-center text-2xl cursor-pointer border-2 rounded-md border-white ${
        isWinning && "bg-green-600"
      }`}
      onClick={() => onMarkUser(index)}
    >
      {/* {value} */}
      <figure className="w-16 h-16">
        {value === "X" && <img src={iconX} alt="Icon X" />}
        {value === "O" && <img src={iconO} alt="Icon O" />}
      </figure>
    </div>
  );
};
