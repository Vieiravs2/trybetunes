import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../components/style.css';

export default class Profile extends React.Component {
  state = {
    isLoading: true,
    userInfo: {},
  };

  async componentDidMount() {
    const dataUserInfo = await getUser();
    this.setState({
      isLoading: false,
      userInfo: dataUserInfo,
    });
  }

  render() {
    const { isLoading, userInfo } = this.state;
    const { image, name, description, email } = userInfo;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading && <Loading /> }
        <div className="profile-container">
          <div className="infos-profile">
            { image === ''
              ? <img className="kk" data-testid="profile-image" src="https://queridojeito.com/wp-content/uploads/2016/09/Autor-Desconhecido.jpg" alt="" />
              : <img className="kk" data-testid="profile-image" src={ image } alt="" /> }
            <p>{name}</p>
            { description === ''
              ? <textarea placeholder="Descrição" />
              : <p>{description}</p> }
            { email === ''
              ? <p> Você ainda não registrou um e-mail</p>
              : <p>{email}</p> }
          </div>
          <div className="button-edit-profile">
            <Link to="/profile/edit">
              <button className="button-19">Editar perfil</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
