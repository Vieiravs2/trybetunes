import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../components/style.css';

export default class Album extends React.Component {
  state = {
    musics: [],
    albumName: '',
    albumImage: '',
    artistName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const newData = data.slice(1);
    this.setState({
      musics: newData,
      albumName: data[0].collectionName,
      albumImage: data[0].artworkUrl100,
      artistName: data[0].artistName,
    });
  }

  loadingVerify = () => {
  };

  render() {
    const { musics, albumName, albumImage, artistName } = this.state;

    return (
      <>
        <Header />
        <div className="page-container" data-testid="page-album">
          <div style={ { flex: 1, width: '70%', marginLeft: 'auto' } }>
            <div className="infos-album">
              <img src={ albumImage } alt={ artistName } />
              <h1 data-testid="artist-name">{artistName}</h1>
              <h3 data-testid="album-name">{albumName}</h3>
            </div>
          </div>
          <div className="music-list-container">
            {musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                trackId={ music.trackId }
                previewUrl={ music.previewUrl }
                loadingVerify={ this.loadingVerify }
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
