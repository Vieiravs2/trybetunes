import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Username from './Username';
import Loading from './Loading';
import './style.css';

export default class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      user: result.name,
      isLoading: true,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header className="header-container" data-testid="header-component">
        <div className="header-components">
          <img src="https://cdn.discordapp.com/attachments/733520580355293286/1094066617689833472/logo.png" alt="Logo TrybeTunes" />
          { !isLoading
            ? <Loading />
            : <Username name={ user } /> }
        </div>
        <div className="links">
          <div className="searchlink">
            <Link data-testid="link-to-search" to="/search">
              <p className="search-button">Search</p>
            </Link>
          </div>
          <div className="favoritelink">
            <Link data-testid="link-to-favorites" to="/favorites">
              <p>Favorites</p>
            </Link>
          </div>
          <div className="profilelink">
            <Link data-testid="link-to-profile" to="/profile">
              <p>Profile</p>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
