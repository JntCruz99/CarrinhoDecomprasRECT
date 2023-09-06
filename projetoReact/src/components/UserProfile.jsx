// src/components/UserProfile.js
import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
  state = {
    userData: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/clientes');
      this.setState({ userData: response.data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { userData, loading, error } = this.state;

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (error) {
      return <div>Ocorreu um erro: {error}</div>;
    }

    return (
      <div>
        <h1>Dados do Usuário</h1>
        <p>ID: {userData.id}</p>
        <p>Nome: {userData.name}</p>
      </div>
    );
  }
}

export default UserProfile;
