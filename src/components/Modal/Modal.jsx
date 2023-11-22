import * as Styled from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  backDropClose = e => {
    e.target === e.currentTarget && this.props.modalClose();
  };
  handleEsc = e => {
    e.code === 'Escape' && this.props.modalClose();
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }
  render() {
    const { image } = this.props;
    return (
      <Styled.Overlay onClick={this.backDropClose}>
        <Styled.Modal>
          <Styled.Image
            src={image.largeImageURL}
            alt={image.tags}
          ></Styled.Image>
        </Styled.Modal>
      </Styled.Overlay>
    );
  }
}
