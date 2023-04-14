import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      const result = await getFavoriteSongs(trackName);
      this.setState({
        favorite: result.some((element) => element.trackName === trackName),
        isLoading: false,
      });
    });
  }

  // async componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     const { trackName } = this.props;
  //     console.log('atualizou');
  //     const result = await getFavoriteSongs(trackName);
  //     this.setState({
  //       favorite: result.some((element) => element.trackName === trackName),
  //       isLoading: false,
  //     });
  //   }
  // }

  onInputChange = async ({ target }) => {
    const { trackName, previewUrl, trackId, loadingVerify } = this.props;
    const { checked } = target;
    console.log(checked);
    loadingVerify(true);
    this.setState({
      [target.id]: checked,
      isLoading: true,

    }, async () => {
      if (checked) {
        await addSong({ trackName, previewUrl, trackId });
        this.setState({
          favorite: true,
          isLoading: false,
        });
      } else {
        await removeSong({ trackName, previewUrl, trackId });
        this.setState({
          favorite: false,
          isLoading: false,
        });
      }
      loadingVerify(false);
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading } = this.state;
    if (isLoading) return (<Loading />);
    return (
      <div className="music-card">
        <p>{trackName}</p>
        <audio
          className="audio-box"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento

          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          className="label-favorite"
        >
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ `checkbox-music-${trackId}` }
            onClick={ this.onInputChange }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
