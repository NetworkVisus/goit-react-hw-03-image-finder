import * as Styled from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesArr }) => {
  return (
    <Styled.List>
      {imagesArr.map(el => (
        <ImageGalleryItem
          source={el.webformatURL}
          alternative={el.id}
          key={el.id}
        />
      ))}
    </Styled.List>
  );
};
