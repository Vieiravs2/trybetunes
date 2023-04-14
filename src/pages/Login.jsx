import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../components/style.css';

export default class Login extends React.Component {
  state = {
    name: '',
    buttonDisabled: true,
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
    const minLength = 3;
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

  userCreate = async () => {
    const { name } = this.state;
    this.setState({
      buttonActive: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { name, buttonDisabled, isLoading, buttonActive } = this.state;
    return (
      <div className="input-form" data-testid="page-login">
        { !isLoading && <Redirect to="/search" /> }
        <form className="form-main">
          <img className="img" src="https://cdn.discordapp.com/attachments/733520580355293286/1094066617689833472/logo.png" alt="Logo TrybeTunes" />
          <div className="login-container">
            <div className="input-name">
              <input
                type="text"
                name="name"
                value={ name }
                data-testid="login-name-input"
                className="in-name"
                placeholder="Insira o seu nome"
                onChange={ this.onInputChange }
              />
            </div>
            <div className="button-submit">
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ this.userCreate }
                disabled={ buttonDisabled }
                className="button-19"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
        { buttonActive && <Loading /> }
      </div>
    );
  }
}
