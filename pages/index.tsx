import { useEffect, useState } from "react";
import useInterval from "use-interval";

const areaWidth = 20;
const areaHeight = 20;
const zoom = 20;
const snakeWidth = 1;
const snakeHeight = 1;

export default function Home() {
  const [snake, setSnake] = useState([
    { top: 1, left: 1 },
    { top: 1, left: 2 },
  ]);

  const [direction, setDirection] = useState("right");

  const [foodHeight, setFoodHeight] = useState(Number);
  const [foodWidth, setFoodWidth] = useState(Number);

  useEffect(() => {
    setFoodHeight(Math.floor(Math.random() * 19) + 1);
    setFoodWidth(Math.floor(Math.random() * 19) + 1);
  }, []);

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
        end();
        break;
      case "left":
        goLeft();
        end();
        break;
      case "down":
        goDown();
        end();
        break;
      case "up":
        goUp();
        end();
        break;
    }
  }, 100);

  const end = () => {
    const deleteSnake = [...snake];
    deleteSnake.shift();
    if (
      deleteSnake.find(
        (e) => e.top === snake[0].top && e.left === snake[0].left
      )
    ) {
      alert("game over");
      location.reload();
    }
  };

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
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: areaWidth * zoom,
            height: areaHeight * zoom,
            backgroundColor: "yellow",
          }}
        >
          {snake &&
            snake.map((position, i) => (
              <div
                key={i}
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
      </div>
      <div>score :{score}</div>
    </div>
  );
}
