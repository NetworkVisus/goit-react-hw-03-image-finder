import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
//* import { Button } from './Button/Button';
import * as imagesApi from '../api/images';

const { Component } = require('react');

export class App extends Component {
  state = {
    searchQuery: '',
    isGalleryLoaded: false,
    imagesArray: [],
    errorMsg: '',
    perPage: 20,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
        this.handleGallery();
    }
/*    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState(prev => ({
        isGalleryLoaded: !prev.isGalleryLoaded,
      }));
      imagesApi
        .getImagesByQuery(this.state.searchQuery)
        .then(data => ({ imagesArray: data.hits }));
    }*/
  }

  handleGallery = async () => {
    try {
      const response = await imagesApi.getImagesByQuery(this.state.searchQuery, this.state.perPage);
      this.setState({ imagesArray: response, isGalleryLoaded: true, error: '' })
    }
    catch (error){
      this.setState({isGalleryLoaded: false, errorMsg: error})
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
          <ImageGallery imagesArr={this.state.imagesArray.hits} />
        )}
        
      </>
    );
  }
}

/*{this.state.isGalleryLoaded && this.state.imagesArray.}*/
