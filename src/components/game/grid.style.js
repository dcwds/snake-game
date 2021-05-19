import styled from "styled-components"

export const Grid = styled.div.attrs({
  "aria-label": "grid"
})`
  display: grid;
  gap: 1%;
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  max-width: 40em;
  width: 100%;
`

export const Row = styled.div.attrs({
  "aria-label": "row"
})`
  display: grid;
  gap: 1%;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  width: 100%;
  height: 4vh;
`
export const Cell = styled.div.attrs({
  "arial-label": "cell"
})`
  background-color: ${(props) =>
    props.isSnake ? "green" : props.isApple ? "red" : "lightgray"};
  width: 4vh;
`
