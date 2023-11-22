import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import * as imagesApi from '../api/images';
import * as Styled from './App.styled';

const { Component } = require('react');

export class App extends Component {
  state = {
    searchQuery: '',
    isGalleryLoaded: false,
    images: [],
    errorMsg: '',
    perPage: 20,
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    chosenImage: null,
    isShowModal: false,
    isSearch: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleGallery();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      imagesApi
        .getImagesByQuery(this.state.searchQuery, _, this.state.currentPage)
        .then(({ hits }) => {
          this.setState(prev => ({
            isLoading: true,
            images: [...prev.images, ...hits],
          }));
        })
        .catch(error => {
          this.setState({ isGalleryLoaded: false, errorMsg: error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleGallery = async () => {
    this.setState({
      isLoading: true,
      isSearch: true,
    });
    await imagesApi
      .getImagesByQuery(this.state.searchQuery)
      .then(({ hits, totalHits }) => {
        if (totalHits !== 0) {
          this.setState({
            images: hits,
            isGalleryLoaded: true,
            error: '',
            totalPages: Math.ceil(totalHits / hits.length),
          });
        } else {
          alert(
            "Unfortunately, we weren't able to find something related to your search query"
          );
          this.setState({
            isGalleryLoaded: false,
          });
        }
      })
      .catch(error => {
        this.setState({ isGalleryLoaded: false, errorMsg: error });
      })
      .finally(() => {
        this.setState({ isLoading: false, isSearch: false });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQueryValue = e.target.elements.searchQuery.value.trim();
    this.setState(prev => ({
      searchQuery: searchQueryValue,
      isGalleryLoaded: false,
    }));
    //e.target.reset(); //IDK if I should use it
  };

  handleModal = e => {
    console.log(e.target);
    const currentId = Number(e.target.id);
    console.log(currentId);
    const chosenImageTmp = this.state.images.filter(el => el.id === currentId);
    console.log(chosenImageTmp[0]);
    this.setState({ isShowModal: true, chosenImage: chosenImageTmp[0] });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false, chosenImage: null });
  };

  render() {
    return (
      <Styled.Div>
        <Searchbar
          handleSubmit={this.handleSubmit}
          isSearch={this.state.isSearch}
        ></Searchbar>
        {this.state.isLoading && <Loader isLoading={this.state.isLoading} />}
        {this.state.isGalleryLoaded && (
          <ImageGallery
            imagesArr={this.state.images}
            handleModal={this.handleModal}
          />
        )}
        {this.state.totalPages > this.state.currentPage &&
          this.state.isGalleryLoaded &&
          !this.state.isLoading && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}
        {this.state.isShowModal && (
          <Modal
            image={this.state.chosenImage}
            modalClose={this.handleModalClose}
          />
        )}
      </Styled.Div>
    );
  }
}

/*{this.state.isGalleryLoaded && this.state.imagesArray.}*/
