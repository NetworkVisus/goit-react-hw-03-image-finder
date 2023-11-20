import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as imagesApi from '../api/images';

const { Component } = require('react');

export class App extends Component {
  state = {
    searchQuery: '',
    isGalleryLoaded: false,
    imagesArray: [],
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState(prev => ({
        isGalleryLoaded: !prev.isGalleryLoaded,
      }));
      imagesApi
        .getImagesByQuery(this.state.searchQuery)
        .then(data => ({ imagesArray: data.hits }));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const searchQueryValue = e.target.elements.searchQuery.value;
    this.setState(prev => ({
      searchQuery: searchQueryValue,
    }));
    e.target.reset();
  };
  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit}></Searchbar>
        {this.state.isGalleryLoaded && (
          <ImageGallery imagesArr={this.state.imagesArray} />
        )}
      </>
    );
  }
}
