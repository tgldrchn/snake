import { useEffect, useState } from "react";
import useInterval from "use-interval";

const areaWidth = 20;
const areaHeight = 20;
const zoom = 19;
const snakeWidth = 1;
const snakeHeight = 1;

export default function Home() {
  const [snake, setSnake] = useState([
    { top: 1, left: 1 },
    { top: 1, left: 2 },
    { top: 1, left: 3 },
    { top: 1, left: 4 },
    { top: 1, left: 5 },
  ]);

  const [direction, setDirection] = useState("right");

  const [foodHeight, setFoodHeight] = useState(
    Math.floor(Math.random() * 19) + 1
  );
  const [foodWidth, setFoodWidth] = useState(
    Math.floor(Math.random() * 19) + 1
  );
  const [score, setScore] = useState(0);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
      }
    });
  });
  useInterval(() => {
    switch (direction) {
      case "right":
        goRight();
        break;
      case "left":
        goLeft();
        break;
      case "down":
        goDown();
        break;
      case "up":
        goUp();
        break;
      default:
        goRight();
    }
  }, 190);

  const goRight = () => {
    let newSnake = [...snake];
    let newLeft = newSnake[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    newSnake.unshift({ ...newSnake[0], left: newLeft });
    if (foodHeight === newSnake[0].top && foodWidth === newSnake[0].left) {
      setFoodHeight(Math.floor(Math.random() * 19) + 1);
      setFoodWidth(Math.floor(Math.random() * 19) + 1);
      setScore((prev) => prev + 1);
      console.log("score");
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const goDown = () => {
    let newSnake = [...snake];
    let newTop = newSnake[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    newSnake.unshift({ ...newSnake[0], top: newTop });
    if (foodHeight === newSnake[0].top && foodWidth === newSnake[0].left) {
      setFoodHeight(Math.floor(Math.random() * 19) + 1);
      setFoodWidth(Math.floor(Math.random() * 19) + 1);
      setScore((prev) => prev + 1);
      console.log("score");
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };
  const goLeft = () => {
    let newSnake = [...snake];
    let newLeft = newSnake[0].left - 1;
    if (newLeft < 0) {
      newLeft = areaWidth - snakeWidth;
    }
    newSnake.unshift({ ...newSnake[0], left: newLeft });
    if (foodHeight === newSnake[0].top && foodWidth === newSnake[0].left) {
      setFoodHeight(Math.floor(Math.random() * 19) + 1);
      setFoodWidth(Math.floor(Math.random() * 19) + 1);
      setScore((prev) => prev + 1);
      console.log("score");
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };
  const goUp = () => {
    let newSnake = [...snake];

    let newTop = newSnake[0].top - 1;

    if (newTop < 0) {
      newTop = areaHeight - snakeHeight;
    }
    newSnake.unshift({ ...newSnake[0], top: newTop });
    if (foodHeight === newSnake[0].top && foodWidth === newSnake[0].left) {
      setFoodHeight(Math.floor(Math.random() * 19) + 1);
      setFoodWidth(Math.floor(Math.random() * 19) + 1);
      setScore((prev) => prev + 1);
      console.log("score");
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: areaWidth * zoom,
          height: areaHeight * zoom,
          backgroundColor: "yellow",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: snakeWidth * zoom,
              height: snakeHeight * zoom,
              position: "absolute",
              left: foodWidth * zoom,
              top: foodHeight * zoom,
              backgroundColor: "red",
              borderRadius: 50,
            }}
          ></div>
          {snake &&
            snake.map((position) => (
              <div
                style={{
                  width: snakeWidth * zoom,
                  height: snakeHeight * zoom,
                  position: "absolute",
                  top: position.top * zoom,
                  left: position.left * zoom,
                  backgroundColor: "brown",
                  borderRadius: 50,
                }}
              ></div>
            ))}
        </div>
      </div>
      <div>score :{score}</div>
    </div>
  );
}
