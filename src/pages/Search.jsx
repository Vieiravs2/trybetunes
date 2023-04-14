import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../components/style.css';

export default class Search extends React.Component {
  state = {
    name: '',
    artistName: '',
    buttonDisabled: true,
    listAlbum: [],
    buttonActive: false,
    isLoading: true,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checked' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.verifyForm);
  };

  verifyForm = () => {
    const { name } = this.state;
    const minLength = 2;
    if (name.length < minLength) {
      this.setState({
        buttonDisabled: true,
      });
    } else {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  searchButton = async () => {
    const { name } = this.state;
    this.setState({
      buttonActive: true,
      artistName: name,
    });
    const result = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      listAlbum: result,
      buttonActive: false,
      isLoading: false,
    });
  };

  render() {
    const {
      name,
      buttonDisabled,
      listAlbum,
      buttonActive,
      isLoading,
      artistName,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="main-form">
          <form className="form-class">
            <div className="input-artist">
              <input
                data-testid="search-artist-input"
                name="name"
                value={ name }
                className="in-name"
                onChange={ this.onInputChange }
                placeholder="Digite o nome do artista ou da banda"
              />
            </div>
            <div className="button-artist">
              <button
                type="button"
                className="button-19"
                disabled={ buttonDisabled }
                data-testid="search-artist-button"
                onClick={ this.searchButton }
              >
                Pesquisar
              </button>
            </div>
          </form>
        </div>
        { buttonActive && <Loading />}
        { !isLoading
          && <p className="album-result">{`Resultado de álbuns de: ${artistName}`}</p> }
        <div className="songs">
          {!isLoading && listAlbum.length > 0
            ? listAlbum.map((element) => (
              <Link
                className="a-link"
                key={ element.collectionId }
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <div className="songs-results">
                  <img src={ element.artworkUrl100 } alt={ element.artistName } />
                  <p className="artistName">{element.artistName}</p>
                  <p className="collectionName">{element.collectionName}</p>
                </div>
              </Link>
            )) : <p className="nil-result">Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}
