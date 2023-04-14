import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../components/style.css';

export default class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const data = await getFavoriteSongs();
    this.setState({
      favoriteSongs: data,
      isLoading: false,
    });
  }

  async componentDidUpdate() {
    const data = await getFavoriteSongs();
    this.setState({
      favoriteSongs: data,
    });
  }

  loadingVerify = (isLoadingParam) => {
    this.setState({
      isLoading: isLoadingParam,
    });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading && <Loading /> }
        <div className="favoriteSongs">
          { favoriteSongs.length === 0
            ? <h1 className="p-fav">Não há nenhuma música favoritada</h1>
            : favoriteSongs.map((element, index) => (
              <MusicCard
                key={ index }
                trackName={ element.trackName }
                trackId={ element.trackId }
                previewUrl={ element.previewUrl }
                loadingVerify={ this.loadingVerify }
              />
            ))}
        </div>
      </div>
    );
  }
}
