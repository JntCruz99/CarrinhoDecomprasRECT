import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './components/PostList';
import Produtos from './components/Produtos';
import Carrinho from './components/Carrinho';

function App() {
  const [pagina, setPagina] = useState('Home');

  // Função para renderizar o componente com base na página selecionada
  const renderizarPagina = () => {
    switch (pagina) {
      case 'Home':
        return <Produtos/>;
      case 'Carrinho':
        return <Carrinho/>
      case 'Clientes':
        return <PostList />; 
      default:
        return null; 
    }
  };

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">LOJA</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" className="btn btn-link" onClick={() => setPagina('Home')}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" className="btn btn-link" onClick={() => setPagina('Carrinho')}>Carrinho</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" className="btn btn-link" onClick={() => setPagina('Clientes')}>Clientes</a>
                        </li>
                    </ul>
                    
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        <div class='container'>
          {renderizarPagina()}
        </div>
        
    </div>
  )
}

export default App
