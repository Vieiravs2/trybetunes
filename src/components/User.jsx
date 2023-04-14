import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
  state = {
    imageDefault: 'https://queridojeito.com/wp-content/uploads/2016/09/Autor-Desconhecido.jpg',
  };

  render() {
    const { name } = this.props;
    const { imageDefault } = this.state;
    return (
      <div className="una">
        <img className="userimg" src={ imageDefault } alt="User" />
        <p className="username" data-testid="header-user-name">{name}</p>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
