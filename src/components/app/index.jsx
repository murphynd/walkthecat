import React, { useEffect, useState } from "react"; // highlevel state
import useDraggable from "../../hooks/use-draggable.js";
import TilePalette from "../tile-palette";
import Map from "../map";
import Player from "../player";

const Instructions = {
  position: "absolute",
  right: "300px",
  top: "1px",
  width: "300px",
  height: "500px",
  color: "white",
};
export default function App() {
  const [tileset, setTileset] = useState("grasslands_1");
  const [activeTile, setActiveTile] = useState({ x: 1 * 32, y: 4 * 32 });
  const [tiles, setTiles] = useState([]);
  const [mapSize, setMapSize] = useState({
    width: 800,
    height: 600,
  });

  const { position } = useDraggable("handle");

  useEffect(() => {
    // two arguments frist is the arrow function when the side effect happens and the second is the list of dependencies
    const _tiles = []; // only used in this use effect block
    let id = 0; //mutable value
    for (let y = 0; y < mapSize.height; y = y + 32) {
      //tile matrix
      const row = [];
      for (let x = 0; x < mapSize.width; x = x + 32) {
        // iner for loop for width
        row.push({ x, y, id: id++, v: { x: -32, y: -32 } }); // v is a value key  set to neg so the map will show a blank tile
      }
      _tiles.push(row);
    }
    setTiles(_tiles); // new matrix from _tiles becomes the state
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: "grey",
          overflow: "hidden",
          border: "1px solid black",
        }}
      >
        <Map
          tiles={tiles}
          tileset={tileset}
          size={mapSize}
          activeTile={activeTile}
          setTiles={setTiles}
        />
        <div style={Instructions}>
          <h1>Hello, take the cat for a walk please.</h1>
          <p>
            Just move that pesky map maker to the side and you will see him.
            While you are at it, create a world with that map maker. (use your
            arrow keys to move the cat)
          </p>
        </div>
        <TilePalette
          position={position}
          tileset={tileset}
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          size={{
            height: 288,
            width: 640,
          }}
        />
        <Map
          tiles={tiles}
          tileset={tileset}
          size={mapSize}
          activeTile={activeTile}
          setTiles={setTiles}
        />
        <Player skin="Cat" />
      </div>
    </>
  );
}
