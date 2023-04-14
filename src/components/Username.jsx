import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

export default class Username extends Component {
  state = {
    imageDefault: 'https://queridojeito.com/wp-content/uploads/2016/09/Autor-Desconhecido.jpg',
  };

  async componentDidMount() {
    const result = await getUser();
    const { image } = result;
    if (image === '') {
      this.setState({
        imageDefault: 'https://queridojeito.com/wp-content/uploads/2016/09/Autor-Desconhecido.jpg',
      });
    } else {
      this.setState({
        imageDefault: image,
      });
    }
  }

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

Username.propTypes = {
  name: PropTypes.string.isRequired,
};
