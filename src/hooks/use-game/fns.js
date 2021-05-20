import { GAME_SIZE } from "../../constants"

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
  let nextSnake = [...snake]
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
        nextGrid: grid,
        nextSnake
      }
    case null: // wall
      return {
        appleEaten: false,
        collision: true,
        nextGrid: grid,
        nextSnake
      }
    default:
      nextSnake = snake.map((_, idx) =>
        snake[idx - 1] !== undefined ? snake[idx - 1] : { x, y }
      )

      return {
        appleEaten,
        collision: false,
        nextGrid: drawSnake(snake, nextSnake, grid),
        nextSnake
      }
  }
}

const drawSnake = (prevSnake, nextSnake, grid) => {
  let abandonedCell = prevSnake.filter((l) => !nextSnake.includes(l))

  nextSnake.forEach(({ x, y }) => {
    grid[y][x] = 1
  })

  // the snake will no longer occupy a cell every time it moves
  // so it must be reset
  grid[abandonedCell[0].y][abandonedCell[0].x] = 0

  return grid
}

// I think recursion is probably a poor strategy here, as the snake
// grows, so does the probability of generating an apple cell that is occupied
const drawApple = (grid) => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const nextApplePos = { x: rand(0, GAME_SIZE - 1), y: rand(0, GAME_SIZE - 1) }

  // occupied by snake
  if (grid[nextApplePos.y][nextApplePos.x] === 1) return drawApple(grid)
  else {
    grid[nextApplePos.y][nextApplePos.x] = 2

    return grid
  }
}

export { getNextFrame, getNextSnakePos, drawSnake, drawApple }
