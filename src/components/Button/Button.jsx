import * as Styled from "./Button.styled"

export const Button = ({ handleLoadMore }) => {
  return (
    <Styled.Button onClik={handleLoadMore}>Load more</Styled.Button>
  )
}
