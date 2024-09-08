import { useEffect, useState } from "react";

type Mark = undefined | "X" | "O";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(cells: Mark[]): boolean {
  for (const pattern of winPatterns) {
    const [x, y, z] = pattern;
    if (cells[x] && cells[x] === cells[y] && cells[y] === cells[z]) return true;
  }
  return false;
}

export default function App() {
  const players: Mark[] = ["X", "O"];
  const [cells, setCells] = useState(Array<Mark>(9).fill(undefined));
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState<number | undefined>();

  const reset = () => {
    setTurn(-1);
    setWinner(undefined);
    setCells(Array(9).fill(undefined));
  };

  const checkCell = (c: Mark, idx: number) => {
    if (c || winner != undefined) return;
    setCells((prev) => {
      const copy = [...prev];
      copy[idx] = players[turn % players.length];
      return copy;
    });
  };
  console.log({ turn });

  useEffect(() => {
    if (checkWin(cells)) {
      setWinner(turn);
      return;
    }
    setTurn((prev) => prev + 1);
  }, [cells]);

  const Player = (
    <span className="text-indigo-600 font-extrabold">
      {players[turn % players.length]}
    </span>
  );
  return (
    <>
      <div className="flex h-dvh gap-4 w-dvw flex-col items-center justify-center bg-neutral-50 text-3xl sm:text-4xl md:text-5xl lg:6xl font-[Lexend,sans-serif]">
        {winner != undefined ? (
          <p className="p-4 border border-green-400 bg-green-200 rounded-lg">
            Player {Player} won!
          </p>
        ) : turn > 8 ? (
          <p className="p-4 border rounded-lg bg-yellow-100 border-orange-200">
            It's a match :|
          </p>
        ) : (
          <p className="p-4 border rounded-lg">
            It's player {Player}'s turn...
          </p>
        )}
        <div className="grid grid-cols-3 grid-rows-3 shadow-lg">
          {cells.map((c, i) => {
            return (
              <button
                key={"cell" + i}
                className="aspect-square w-24 sm:w-36 md:w-44 lg:w-56 text-6xl sm:text-7xl md:text-8xl lg:text-9xl border-2 p-4 hover:shadow-lg active:bg-neutral-100"
                onClick={() => checkCell(c, i)}
              >
                {c}
              </button>
            );
          })}
        </div>
        <button
          onClick={reset}
          className="p-4 border-2 rounded-lg border-dashed border-neutral-400 active:bg-neutral-100"
        >
          Reset
        </button>
      </div>
    </>
  );
}
