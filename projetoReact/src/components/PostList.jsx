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
      <div className="container">
        <table  className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>nome</th>
              <th>idade</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.nome}</td>
                <td>{post.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PostList;
