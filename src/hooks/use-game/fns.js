import { GAME_SIZE } from "../../constants"

let grid = Array(GAME_SIZE)
  .fill([])
  .map((arr) => Array(GAME_SIZE).fill(0))

let snake = [
  { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) - 1 }, // head
  { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) },
  { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) + 1 } // tail
]

const getNextSnakePos = (snake, dir) => {
  const modifier = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  }[dir]

  return {
    x: snake[0].x + modifier.x,
    y: snake[0].y + modifier.y
  }
}

const getNextFrame = (grid, snake, dir, appleEaten = false) => {
  const { x, y } = getNextSnakePos(snake, dir)
  let nextCell = null

  if (grid[y] !== undefined && grid[y][x] !== undefined) {
    nextCell = grid[y][x]
  }

  switch (nextCell) {
    case 2: // apple
      return getNextFrame(grid, [{ x, y }, ...snake], dir, true)
    case 1: // snake
      return {
        appleEaten: false,
        collision: true,
        grid,
        snake
      }
    case null: // wall
      return {
        appleEaten: false,
        collision: true,
        grid,
        snake
      }
    default:
      snake = snake.map((_, idx) =>
        snake[idx - 1] !== undefined ? snake[idx - 1] : { x, y }
      )

      return {
        appleEaten,
        collision: false,
        grid: drawSnake(snake, grid),
        snake
      }
  }
}

const drawSnake = (snake, grid) => {
  let gridClone = grid.map((a) => a.slice())

  snake.forEach(({ x, y }) => {
    gridClone[y][x] = 1
  })

  return gridClone
}

// I think recursion is probably a poor strategy here, as the snake
// grows, so does the probability of generating an apple cell that is occupied
const drawApple = (grid) => {
  let gridClone = grid.map((a) => a.slice())

  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const nextApplePos = { x: rand(0, GAME_SIZE), y: rand(0, GAME_SIZE) }
  let nextCell = gridClone[nextApplePos.y][nextApplePos.x]

  // occupied by snake
  if (nextCell === 1) return drawApple(gridClone)
  else {
    nextCell = 2
    return gridClone
  }
}

export { grid, snake, getNextFrame, getNextSnakePos, drawSnake, drawApple }
