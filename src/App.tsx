import { Routes, Route, Navigate } from "react-router-dom";
import { Game, Home } from "./pages";
import { MainLayout } from "./components/layouts";

export const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
};
