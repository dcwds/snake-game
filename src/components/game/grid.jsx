import { memo } from "react"
import * as S from "./grid.style"

const Cell = memo((props) => <S.Cell {...props}></S.Cell>)

const Row = memo(({ cells, size }) => (
  <S.Row size={size}>
    {cells.map((c, idx) => (
      <Cell aria-label="cell" key={idx} isSnake={!!c} isApple={c === 2} />
    ))}
  </S.Row>
))

const Grid = ({ size, grid }) => (
  <S.Grid size={size}>
    {grid.map((row, idx) => (
      <Row size={size} key={idx} cells={row} />
    ))}
  </S.Grid>
)

export default Grid
