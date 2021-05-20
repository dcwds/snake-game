import styled from "styled-components"

const getCellColor = (props) => {
  if (props.isApple) return "red"
  if (props.isSnake) return "green"

  return "lightgray"
}

export const Grid = styled.div.attrs({
  "aria-label": "grid"
})`
  display: grid;
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  max-width: 40em;
  width: 100%;
`

export const Row = styled.div.attrs({
  "aria-label": "row"
})`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  width: 100%;
  height: 4vh;
`
export const Cell = styled.div.attrs({
  "arial-label": "cell"
})`
  background-color: ${(props) => getCellColor(props)};
  width: 4vh;
`
