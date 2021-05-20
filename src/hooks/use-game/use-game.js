import { useEffect, useState, useRef } from "react"
import { GAME_SIZE } from "../../constants"
import { getNextFrame, drawApple } from "./fns"

const initialState = {
  score: 0,
  dir: "up",
  snake: [
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) - 1 }, // head
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) },
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) + 1 } // tail
  ],
  grid: Array(GAME_SIZE)
    .fill([])
    .map((arr) => Array(GAME_SIZE).fill(0))
}

const dirs = {
  u: { dir: "up", opposite: "down" },
  d: { dir: "down", opposite: "up" },
  l: { dir: "left", opposite: "right" },
  r: { dir: "right", opposite: "left" }
}

const keyMap = {
  w: dirs.u,
  up: dirs.u,
  s: dirs.d,
  down: dirs.d,
  a: dirs.l,
  left: dirs.l,
  d: dirs.r,
  right: dirs.r
}

const useGame = () => {
  const [direction, setDirection] = useState(initialState.dir)
  const [score, setScore] = useState(initialState.score)
  const [snake, setSnake] = useState(initialState.snake)
  const [grid, setGrid] = useState(initialState.grid)
  const [gameOver, setGameOver] = useState(false)

  let firstTick = useRef(true)

  useEffect(() => {
    const setDirectionOnKeyDown = (e) => {
      const key = keyMap[e.key.replace(/arrow/i, "").toLowerCase()] || ""

      if (!!key && direction !== key.opposite) setDirection(key.dir)
    }

    window.addEventListener("keydown", setDirectionOnKeyDown, false)

    return () => window.removeEventListener("keydown", setDirectionOnKeyDown)
  }, [direction])

  useEffect(() => {
    const tick = setInterval(() => {
      let { appleEaten, collision, nextGrid, nextSnake } = getNextFrame(
        grid.map((a) => [...a]),
        snake,
        direction
      )

      if (firstTick.current) {
        nextGrid = drawApple(nextGrid)
        firstTick.current = false
      }

      if (appleEaten) {
        nextGrid = drawApple(nextGrid)
        setScore(score + 1)
      }

      if (collision) {
        setGameOver(true)
        return clearInterval(tick)
      }

      setGrid(nextGrid)
      setSnake(nextSnake)
    }, 50)

    return () => clearInterval(tick)
  }, [score, grid, snake, direction, firstTick])

  return { score, direction, grid, gameOver }
}

export default useGame
