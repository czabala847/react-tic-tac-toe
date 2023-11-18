import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(175deg, rgba(156,183,161,1) 0%, rgba(47,93,97,1) 55%, rgba(9,21,30,1) 100%)",
      }}
    >
      <div className="mx-auto my-0 py-0 px-8" style={{ maxWidth: "1440px" }}>
        {children}
      </div>
    </main>
  );
};
