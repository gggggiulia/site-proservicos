import React from 'react';
import { Link } from 'react-router-dom';

import eletricistaImg from '../assets/eletricista.png';
import diaristaImg from '../assets/diarista.jpg';
import marceneiroImg from '../assets/marceneiro.png';
import pintoraImg from '../assets/pintora.png';
import jardineiroImg from '../assets/jardineiro.jpg';

function Prestadores({ prestadores, servicos }) {
  if (!prestadores || prestadores.length === 0 || !servicos || servicos.length === 0) {
    return <p>Carregando prestadores e serviços...</p>;
  }

  const obterNomeServico = (id) => {
    const servico = servicos.find(s => s.id === id);
    return servico ? servico.nome : `Serviço ${id}`;
  };

  const obterImagemPrestador = (prestador) => {
    if (prestador.id === 101 || prestador.nome.includes('Edgar')) return eletricistaImg;
    if (prestador.id === 102 || prestador.nome.includes('Maria')) return diaristaImg;
    if (prestador.id === 103 || prestador.nome.includes('Ricardo')) return marceneiroImg;
    if (prestador.id === 104 || prestador.nome.includes('Juliana')) return pintoraImg;
    if (prestador.id === 105 || prestador.nome.includes('Francisco')) return jardineiroImg;

    return diaristaImg;
  };

  const estrelas = (nota) => {
    const arredondada = Math.round(nota);
    return '★'.repeat(arredondada) + '☆'.repeat(5 - arredondada);
  };

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <span>›</span>
        <span>Prestadores</span>
      </div>

      <section className="titulo-padrao">
        <span>Rede de profissionais</span>
        <h3>Prestadores cadastrados</h3>
        <p>Conheça os profissionais disponíveis para atendimento e os serviços vinculados a cada especialidade.</p>
      </section>

      <div className="lista-prestadores">
        {prestadores.map((prestador) => (
          <article key={prestador.id} className="prestador-card-horizontal">
            <img
              src={obterImagemPrestador(prestador)}
              alt={prestador.nome}
              className="imagem-prestador-horizontal"
            />

            <div className="prestador-info">
              <span className="texto-suave">{prestador.especialidade}</span>
              <h4>{prestador.nome}</h4>

              <div className="linha-avaliacao">
                <span className="estrelas-pretas">{estrelas(prestador.avaliacao)}</span>
                <span>{prestador.avaliacao} / 5.0</span>
              </div>

              <p><strong>Contato:</strong> {prestador.telefone}</p>

              <div className="chips-servicos">
                {prestador.servicosVinculados.map((idDoServico) => (
                  <span key={idDoServico}>
                    {obterNomeServico(idDoServico)}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Prestadores;
