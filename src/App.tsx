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
  [2, 4, 7],
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
  const [player, setPlayer] = useState(0);
  const [winner, setWinner] = useState<number | undefined>();
  console.log({ winner, player });

  const reset = () => {
    setPlayer(1);
    setWinner(undefined);
    setCells(Array(9).fill(undefined));
  };

  const checkCell = (c: Mark, idx: number) => {
    if (c || winner != undefined) return;
    setCells((prev) => {
      const copy = [...prev];
      copy[idx] = players[player];
      return copy;
    });
  };

  useEffect(() => {
    if (checkWin(cells)) {
      console.log("someone won");
      setWinner(player);
      return;
    }
    setPlayer((prev) => (prev + 1) % players.length);
  }, [cells]);

  return (
    <>
      <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-neutral-50">
        {winner != undefined ? (
          <p>
            Player <span>{players[player]}</span> won
          </p>
        ) : (
          <p>
            It's player <span>{players[player]}</span>'s turn
          </p>
        )}
        <div className="grid grid-cols-3 grid-rows-3">
          {cells.map((c, i) => {
            return (
              <button
                key={"cell" + i}
                className="aspect-square w-56 border-2 p-8 text-9xl"
                onClick={() => checkCell(c, i)}
              >
                {c}
              </button>
            );
          })}
        </div>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}
