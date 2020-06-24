import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiSearch } from 'react-icons/fi';

import { Container, Content, Header, Main, Form } from './styles';
import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <img src={logo} alt="E-Giro logo" />
          <Link to="/cadastro">
            <FiLogIn />
            <strong>Cadastre um novo sítio</strong>
          </Link>
        </Header>

        <Main>
          <h1>As melhores experiências em toda Portugal</h1>
          <p>
            Compartilhe e busque restaurantes, praias, museus, monumentos e
            muito mais! Com apenas alguns cliques poderás achar os sítios mais
            giros e muita cultura dentro de uma única plataforma.
          </p>

          <Form action="/">
            <div>
              <input
                type="text"
                name="search"
                placeholder="Busque por nome, cidade ou concelho..."
              />
              <button type="submit">
                <FiSearch />
              </button>
            </div>
          </Form>
        </Main>
      </Content>
    </Container>
  );
};

export default Home;
