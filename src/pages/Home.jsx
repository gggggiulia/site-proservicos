import React from 'react';
import { Link } from 'react-router-dom';

import limpezaImg from '../assets/limpeza.jpg';
import arImg from '../assets/ar-condicionado.jpg';
import eletricaImg from '../assets/eletrica.jpg';
import moveisImg from '../assets/moveis.jpg';
import pinturaImg from '../assets/pintura.jpeg';
import jardinagemImg from '../assets/jardinagem.jpg';

function Home({ servicos }) {
  if (!servicos || servicos.length === 0) {
    return <p>Carregando serviços...</p>;
  }

  const imagens = {
    1: limpezaImg,
    2: arImg,
    3: eletricaImg,
    4: moveisImg,
    5: pinturaImg,
    6: jardinagemImg,
  };

  return (
    <div>
      <section className="intro-proservicos">
        <div>
          <span className="breadcrumb-atual">Marketplace de Serviços</span>
          <h3>Contrate profissionais de forma simples, rápida e segura.</h3>
          <p>
            O ProServiços centraliza serviços residenciais, prestadores cadastrados e gerenciamento de contratos em uma experiência digital organizada.
          </p>
          <Link to="/prestadores" className="link-destaque">Conhecer prestadores</Link>
        </div>
      </section>

      <div className="secao-cabecalho">
        <h3>Catálogo de Serviços</h3>
        <Link to="/gerenciamento">Gerenciar contratos</Link>
      </div>

      <div className="grid-servicos">
        {servicos.map((servico) => (
          <article key={servico.id} className="card-servico">
            <img
              src={imagens[servico.id]}
              alt={servico.nome}
              className="imagem-card-servico"
            />

            <div className="card-servico-conteudo">
              <span className="tag-categoria">{servico.categoria}</span>

              <h4>{servico.nome}</h4>

              <p>{servico.descricao}</p>

              <div className="preco-servico">
                A partir de: R$ {servico.precoBase.toFixed(2)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
