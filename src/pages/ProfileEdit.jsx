import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../components/style.css';

export default class ProfileEdit extends React.Component {
  state = {
    userInfo: [],
    loading: true,
  };

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      userInfo: result,
      loading: false,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  userUpdate = async () => {
    const {
      inputName,
      inputEmail,
      inputImage,
      inputDescription,
    } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    const { name, email, description, image } = userInfo;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <form className="profileeditinfo">
          <div className="form__group">
            <div className="infosprofile">
              { image === '' ? <img className="k" data-testid="profile-image" src="https://queridojeito.com/wp-content/uploads/2016/09/Autor-Desconhecido.jpg" alt="" />
                : <img className="k" data-testid="profile-image" src={ image } alt="" /> }
              <h1>
                { name }
              </h1>
              <input
                type="text"
                name="inputName"
                className="form__field"
                onChange={ this.onInputChange }
                data-testid="edit-input-name"
                placeholder="Altere seu nome"
              />
              <h1 className="email">
                { email }
              </h1>
              <input
                type="email"
                name="inputEmail"
                className="form__field"
                onChange={ this.onInputChange }
                data-testid="edit-input-email"
                placeholder="Altere seu Email"
              />
              <h4>
                { description }
              </h4>
              <input
                type="text"
                name="inputDescription"
                className="form__field"
                onChange={ this.onInputChange }
                data-testid="edit-input-description"
                placeholder="Altere sua descrição"
              />
              <input
                type="text"
                name="inputImage"
                className="form__field"
                onChange={ this.onInputChange }
                data-testid="edit-input-image"
                placeholder="Altere sua Imagem"
              />
            </div>
          </div>
          <Link to="/profile">
            <button
              data-testid="edit-button-save"
              className="button-43"
              onClick={ this.userUpdate }
            >
              Salvar informações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
