import { useEffect, useState } from "react";
import useInterval from "use-interval";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

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
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(Number);
  const [options, setOptions] = useState("easy");
  const [speed, setSpeed] = useState(600);
  const [point, setPoint] = useState(1);

  useEffect(() => {
    setFoodHeight(Math.floor(Math.random() * 19) + 1);
    setFoodWidth(Math.floor(Math.random() * 19) + 1);
    setHigh(JSON.parse(`${localStorage.getItem("record")}`).number);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      setDirection((prevDirection) => {
        switch (e.code) {
          case "ArrowRight":
            if (prevDirection !== "left") {
              return "right";
            }
            break;
          case "ArrowLeft":
            if (prevDirection !== "right") {
              return "left";
            }
            break;
          case "ArrowDown":
            if (prevDirection !== "up") {
              return "down";
            }
            break;
          case "ArrowUp":
            if (prevDirection !== "down") {
              return "up";
            }
            break;
        }
        return prevDirection;
      });
      // switch (e.code) {
      //   case "ArrowRight":
      //     setDirection("right");
      //     break;
      //   case "ArrowLeft":
      //     setDirection("left");
      //     break;
      //   case "ArrowDown":
      //     setDirection("down");
      //     break;
      //   case "ArrowUp":
      //     setDirection("up");
      //     break;
      // }
      // switch (e.code) {
      //   case "ArrowRight":
      //     direction !== "left" ? setDirection("right") : setDirection("left");
      //     break;
      //   case "ArrowDown":
      //     direction !== "up" ? setDirection("down") : setDirection("up");
      //     break;
      //   case "ArrowLeft":
      //     direction !== "right" ? setDirection("left") : setDirection("right");
      //     break;
      //   case "ArrowUp":
      //     direction !== "down" ? setDirection("up") : setDirection("down");
      //     break;
      // }
    });
  });

  const highScore = () => {
    let record = JSON.parse(`${localStorage.getItem("record")}`);
    if (record.number < score) {
      localStorage.setItem(
        "record",
        JSON.stringify({
          number: score,
        })
      );
    }
  };

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
    }

    switch (options) {
      case "easy":
        setSpeed(400);
        break;
      case "medium":
        setSpeed(250);
        break;
      case "hard":
        setSpeed(100);
        break;
    }

    switch (options) {
      case "easy":
        setPoint(1);
        break;
      case "medium":
        setPoint(2);
        break;
      case "hard":
        setPoint(3);
        break;
    }
  }, speed);

  useInterval(() => {
    end();
  }, 100);

  const end = () => {
    const deleteSnake = [...snake];
    deleteSnake.shift();
    if (
      deleteSnake.find(
        (e) => e.top === snake[0].top && e.left === snake[0].left
      )
    ) {
      window.location.reload();
      highScore();
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
      setScore((prev) => prev + point);
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
      setScore((prev) => prev + point);
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
      setScore((prev) => prev + point);
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
      setScore((prev) => prev + point);
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
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <h1>Snake</h1>
      <div style={{ margin: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              border: "1px solid green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 30,
            }}
          >
            record
          </div>
          <div
            style={{
              border: "1px solid green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 30,
            }}
          >
            {high && high}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              border: "1px solid green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 30,
            }}
          >
            score
          </div>
          <div
            style={{
              border: "1px solid green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 30,
            }}
          >
            {score}
          </div>
        </div>
      </div>
      <Select
        style={{ height: 30, margin: 10 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={options}
        label="Level"
        onChange={(e) => setOptions(e.target.value)}
      >
        <MenuItem value={"easy"}>Easy</MenuItem>
        <MenuItem value={"medium"}>Medium</MenuItem>
        <MenuItem value={"hard"}>Hard</MenuItem>
      </Select>
      <div style={{ position: "relative", border: `${zoom}px solid green` }}>
        <div
          style={{
            width: areaWidth * zoom,
            height: areaHeight * zoom,
            backgroundColor: "#90EE90",
          }}
        >
          {snake &&
            snake.map((position, i) =>
              i === 0 ? (
                <div
                  key={i}
                  style={{
                    width: snakeWidth * zoom,
                    height: snakeHeight * zoom,
                    position: "absolute",
                    top: position.top * zoom,
                    left: position.left * zoom,
                    backgroundImage: `url(${"https://www.creativefabrica.com/wp-content/uploads/2022/04/12/Cute-Snake-Head-Illustration-Graphics-28859855-3-580x387.jpg"})`,
                    backgroundSize: snakeWidth * zoom * 2.1,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 50,
                  }}
                ></div>
              ) : (
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
              )
            )}
        </div>

        <div
          style={{
            width: snakeWidth * zoom,
            height: snakeHeight * zoom,
            position: "absolute",
            left: foodWidth * zoom,
            top: foodHeight * zoom,
            backgroundImage: `url(${"https://static.vecteezy.com/system/resources/previews/016/637/861/original/red-apple-icon-png.png"})`,
            backgroundSize: snakeWidth * zoom * 1.5,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 50,
          }}
        ></div>
      </div>
    </div>
  );
}
