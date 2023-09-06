import React, { Component } from 'react';
import axios from 'axios';

class PostList extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('http://localhost:8080/clientes')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <h1>Lista de Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.nome}</h2>
              <p>{post.cpf}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostList;
