import React, { Component } from 'react';
import axios from 'axios';
import './css/Produtos.css';
import AlertModal from './AlertModal';

class Produtos extends Component {
    state = {
        produtos: [],
        currentPage: 1,
        totalPages: 1,
        showAlert: false, // Adicione o estado para controlar a exibição do modal
        alertMessage: '', // Mensagem a ser exibida no modal
    };

    componentDidMount() {
        this.fetchProdutos(1);
    }

    fetchProdutos(page) {
        axios.get(`http://localhost:8080/produtos?page=${page - 1}`)
            .then(response => {
                const totalPages = response.data.totalPages;
                this.setState({ produtos: response.data.content, currentPage: page, totalPages });
            })
            .catch(error => {
                console.error(error);
            });
    }

    handlePageChange = (page) => {
        this.fetchProdutos(page);
    }
    handleCloseAlert = () => {
        // Função para fechar o modal
        this.setState({
            showAlert: false,
        });
    }

    handleCompra = (produtoId) => {
        this.setState({
            showAlert: true,
            alertMessage: 'Compra realizada com sucesso!',
        });

        // Crie a URL com base no ID do produto
        const url = `http://localhost:8080/carrinhos/idcliente/1/idproduto/${produtoId}`;

        axios.post(url)
            .then(response => {
                // Compra realizada com sucesso, definir estado da mensagem de sucesso
                this.setState({
                    showAlert: true,
                    alertMessage: 'Compra realizada com sucesso!',
                    alertType: 'success',
                });
            })
            .catch(error => {
                // Erro ao realizar a compra, definir estado da mensagem de erro
                this.setState({
                    showAlert: true,
                    alertMessage: 'Erro ao realizar a compra.',
                    alertType: 'danger',
                });
            });
    }



    renderPaginationButtons() {
        const { currentPage, totalPages } = this.state;
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                    <a className="page-link" href="#" onClick={() => this.handlePageChange(i)}>{i}</a>
                </li>
            );
        }
        return buttons;
    }
    renderAlert() {
        const { showAlert, alertMessage, alertType } = this.state;

        if (showAlert) {
            return (
                <div className={`alert alert-${alertType}`} role="alert">

                    {alertMessage}
                </div>
            );
        }

        return null;
    }

    render() {
        const { produtos, showAlert, alertMessage } = this.state;

        return (
            <div>
                <h1 className="text-center">PRODUTOS</h1>
                {this.renderAlert()}
                <div className="row">
                    {produtos.map(produto => (
                        <div className="col-md-4" key={produto.id}>
                            <div className="card mb-4">
                                <img src="https://img.freepik.com/vetores-premium/conceito-de-atualizacao-e-atualizacao-do-software-do-sistema-carregando-a-tela-do-processo-ilustracao-vetorial_175838-2182.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title">{produto.nome}</h3>
                                    <p className="card-text">{produto.disc}</p>
                                    <h5 className="card-text">R$ {produto.preco}</h5>
                                    <a href="#" className="btn btn-primary" onClick={() => this.handleCompra(produto.id)}>Comprar</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showAlert && (
                        <AlertModal message={alertMessage} onClose={this.handleCloseAlert} />
                    )}
                </div>
                <nav className='product-pagination' aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${this.state.currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => this.handlePageChange(this.state.currentPage - 1)}>Previous</a>
                        </li>
                        {this.renderPaginationButtons()}
                        <li className={`page-item ${this.state.currentPage === this.state.totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => this.handlePageChange(this.state.currentPage + 1)}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Produtos;
