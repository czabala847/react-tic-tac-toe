import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";

export const Home = () => {
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const onNavigateToGame = () => {
    const userStorage = localStorage.getItem("user_ttt");

    const newUser: IUser = {
      code,
      defeats: 0,
      draws: 0,
      games: 0,
      name,
      victories: 0,
    };

    //Si el usuario no existe en localstorage si agrega
    if (!userStorage) {
      localStorage.setItem("user_ttt", JSON.stringify(newUser));
      navigate("/game");
      return;
    }

    const userJson = JSON.parse(userStorage) as IUser;

    //Si el usuario esta usando otro código diferente al guardado en el storage actualizar el storage con el historial a 0
    if (userJson.code !== code) {
      localStorage.setItem("user_ttt", JSON.stringify(newUser));
    }

    navigate("/game");
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user_ttt");

    if (userStorage) {
      const userSaved = JSON.parse(userStorage) as IUser;

      setName(userSaved.name || "");
      setCode(userSaved.code || "");
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center w-full">
      <h1 className="font-bold text-4xl mt-40">Bienvenido</h1>

      <section className="mt-10 w-full">
        <form autoComplete="off" className="w-full md:w-2/5 mx-auto">
          <div className="flex flex-col mb-4">
            <label htmlFor="name">Ingresa tu nombre</label>
            <input
              className="px-4 py-2 rounded-md text-slate-500"
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="name">Ingresa tu código</label>
            <input
              className="px-4 py-2 rounded-md text-slate-500"
              type="text"
              name="code"
              id="code"
              placeholder="Tu código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            onClick={onNavigateToGame}
            className={`px-5 py-2 rounded-3xl shadow-lg ${
              !name || !code
                ? "bg-gray-500 cursor-not-allowed text-slate-700"
                : "bg-[#027CA8]"
            }`}
            type="button"
            disabled={!name || !code}
          >
            Iniciar juego
          </button>
        </form>
      </section>
    </main>
  );
};
