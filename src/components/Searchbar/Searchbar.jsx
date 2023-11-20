import * as Styled from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  return (
    <Styled.Header>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Button type="submit">
          <Styled.Span>Search</Styled.Span>
        </Styled.Button>

        <Styled.Input
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        ></Styled.Input>
      </Styled.Form>
    </Styled.Header>
  );
};
