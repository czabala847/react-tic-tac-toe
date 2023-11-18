import { useState, useCallback, useEffect } from "react";
import { IUser, TResult, Turn } from "../interfaces";
const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useGame = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<Turn>("X");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [result, setResult] = useState<TResult>();
  const [user, setUser] = useState<IUser>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [winCombinations, setWinCombinations] = useState<number[]>([]);

  //Marcar la celda seleccionada por el usuario o la CPU
  const onMarkPosition = useCallback(
    (index: number, player: Turn) => {
      const newBoard = [...board];
      newBoard[index] = player;

      setBoard(newBoard);

      const someWon = checkWinner(newBoard, player);

      if (someWon) {
        const newResult = player === "X" ? "win" : "loser";
        setResult(newResult);
        updateGameHistory(user!, newResult);
        setShowModal(true);

        const winningPositions = getWinningPositions(newBoard, player);
        setWinCombinations(winningPositions);
        return;
      }
      setTurn((currentTurn) => (currentTurn === "O" ? "X" : "O")); //Cambiar el turno
    },
    [board, user]
  );

  //Marcar posición elegida por el usuario
  const onMarkUser = (index: number) => {
    //Si la celda en la posición que seleccione el usuario no esta vacía no hacer nada
    //Y tampoco hacer nada si el turno no es del usuario
    if (board[index] !== "" || turn !== "X") return;
    onMarkPosition(index, "X");
  };

  //Realizar acción de la CPU
  const onMarkCPU = useCallback(() => {
    const availablePositions = emptyCells([...board]);
    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    onMarkPosition(randomPosition, "O");
  }, [board, onMarkPosition]);

  //Consultar posiciones disponibles para que la CPU pueda elegir
  const emptyCells = (currentBoard: string[]): number[] => {
    const availablePositions: number[] = [];

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === "") {
        availablePositions.push(i);
      }
    }

    return availablePositions;
  };

  //Revisar si hay un ganador entre el usuario o la CPU
  const checkWinner = (currentBoard: string[], player: Turn): boolean => {
    return WINNING_COMBINATIONS.some((combination) =>
      combination.every((index) => currentBoard[index] === player)
    );
  };

  //Obtener la combinación ganadora para marcarla sus celdas de color verde
  const getWinningPositions = (
    currentBoard: string[],
    symbol: string
  ): number[] => {
    const winningCombination = WINNING_COMBINATIONS.find((combination) =>
      combination.every((index) => currentBoard[index] === symbol)
    );

    return winningCombination || [];
  };

  const onEndGame = () => {
    //Reiniciar todo
    setBoard(Array(9).fill(""));
    setTurn("X");
    setResult(undefined);
    setWinCombinations([]);
    setShowModal(false);
  };

  const updateGameHistory = (currentUser: IUser, result: TResult) => {
    const newUser: IUser = { ...currentUser };
    newUser.games = newUser.games + 1;
    if (result === "loser") {
      newUser.defeats = newUser.defeats + 1;
    } else if (result === "tie") {
      newUser.draws = newUser.draws + 1;
    } else {
      newUser.victories = newUser.victories + 1;
    }

    localStorage.setItem("user_ttt", JSON.stringify(newUser));
    setUser(newUser);
  };

  //Ejecutar turno de la CPU
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (turn === "O" && !result) {
        onMarkCPU();
      }
    }, 500);

    return () => clearTimeout(timeOut);
  }, [turn, onMarkCPU, result]);

  //Revisar si en localstorage existe el usuario y guardar en el estado local
  useEffect(() => {
    setLoadingUser(true);
    const userFound = localStorage.getItem("user_ttt");

    if (userFound) {
      setUser(JSON.parse(userFound));
    }

    setLoadingUser(false);
  }, []);

  //Calcular en caso de empate
  useEffect(() => {
    //Si el tablero ya no tiene celdas vacías y no hay aún ganador es un empate
    if (!board.includes("") && !result && user) {
      setResult("tie");
      updateGameHistory(user, "tie");
      setShowModal(true);
    }
  }, [board, result, user]);

  return {
    board,
    loadingUser,
    onEndGame,
    onMarkUser,
    result,
    showModal,
    turn,
    user,
    winCombinations,
  };
};
