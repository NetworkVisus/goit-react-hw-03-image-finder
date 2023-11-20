import * as Styled from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ source, alternative }) => {
  return (
    <Styled.Item>
      <Styled.Image src={source} alt={alternative} />
    </Styled.Item>
  );
};
