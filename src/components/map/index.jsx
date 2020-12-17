import { dropRightWhile } from "lodash";
import React from "react";
export default function Map({ tiles, setTiles, activeTile, tileset, size }) {
  function cloneMatrix(m) {
    const clone = new Array(m.length);
    for (let i = 0; i < m.length; ++i) {
      clone[i] = m[i].slice(0);
    }
    return clone;
  }
  function dropTile({ x, y }) {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const tile = {
        ...clone[y][x],
        v: activeTile,
      };
      clone[y][x] = tile;
      return clone;
      //clone matrix, alter tile @x/y to the active tile
    });
  }
  return (
    <div
      style={{
        boxSizing: "border-box",
        backgroundColor: "white",
        width: size.width,
      }}
    >
      {tiles.map((row, y) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, x) => (
            <div
              onClick={() => dropTile({ x, y })}
              style={{
                borderTop: "1px solid black",
                borderRight: "1px solid black",
                background: `url(/sprites/zones/${tileset}.png) -${tile.v.x}px -${tile.v.y}px no-repeat`,
                width: 32,
                height: 32,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
