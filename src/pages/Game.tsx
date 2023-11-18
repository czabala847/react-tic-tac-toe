import { Navigate } from "react-router-dom";
import {
  BoardCell,
  CurrentTurn,
  GameHistory,
  ModalResult,
} from "../components/ui";
import { useGame } from "../hooks";

export const Game = () => {
  const {
    board,
    loadingUser,
    onEndGame,
    onMarkUser,
    result,
    showModal,
    turn,
    user,
    winCombinations,
  } = useGame();

  //Si no existe un usuario, no dejar jugar
  if (!loadingUser && !user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center w-full pt-4">
      {user && (
        <>
          <GameHistory user={user} />
          <section>
            <div className="grid grid-cols-3 gap-1">
              {board.map((cell, index) => (
                <BoardCell
                  isWinning={winCombinations.includes(index)}
                  key={index}
                  index={index}
                  value={cell}
                  onMarkUser={onMarkUser}
                />
              ))}
            </div>
          </section>
          <CurrentTurn turn={turn} />

          <ModalResult
            showModal={showModal}
            result={result!}
            closeModal={onEndGame}
          />
        </>
      )}
    </main>
  );
};
