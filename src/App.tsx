import { useState } from "react";

type CellState = undefined | "x" | "o";

export default function App() {
  const [cells, setCells] = useState(Array<CellState>(9).fill(undefined));
  const [currentPlayer, setCurrentPlayer] = useState<CellState>("x");

  function handleClick(c: CellState, i: number) {
    if (c) return;
    setCells((prev) => {
      const copy = [...prev];
      copy[i] = currentPlayer;
      return copy;
    });
    if (currentPlayer === "x") setCurrentPlayer("o");
    else setCurrentPlayer("x");
  }
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-neutral-50">
        <div className="grid grid-cols-3 grid-rows-3">
          {cells.map((c, i) => {
            return (
              <button
                className="aspect-square w-56 border-2 p-8 text-9xl"
                onClick={() => handleClick(c, i)}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
