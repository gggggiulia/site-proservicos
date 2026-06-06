import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dadosIniciais from '../data/dados.json';

function Gerenciamento() {
  const [contratos, setContratos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [cliente, setCliente] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [prestadorId, setPrestadorId] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [status, setStatus] = useState('Agendado');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const [clienteAvaliacao, setClienteAvaliacao] = useState('');
  const [prestadorAvaliacaoId, setPrestadorAvaliacaoId] = useState('');
  const [nota, setNota] = useState('5');
  const [comentario, setComentario] = useState('');
  const [idAvaliacaoEdicao, setIdAvaliacaoEdicao] = useState(null);

  useEffect(() => {
    setContratos(dadosIniciais.contratos || []);
    setAvaliacoes(dadosIniciais.avaliacoes || []);
  }, []);

  const obterNomeServico = (id) => {
    const servico = dadosIniciais.servicos.find(s => s.id === id);
    return servico ? servico.nome : 'Serviço não encontrado';
  };

  const obterNomePrestador = (id) => {
    const prestador = dadosIniciais.prestadores.find(p => p.id === id);
    return prestador ? prestador.nome : 'Prestador não encontrado';
  };

  const calcularValorServico = (id) => {
    const servico = dadosIniciais.servicos.find(s => s.id === Number(id));
    return servico ? servico.precoBase : 0;
  };

  const limparFormularioContrato = () => {
    setCliente('');
    setServicoId('');
    setPrestadorId('');
    setDataAgendamento('');
    setStatus('Agendado');
    setIdEmEdicao(null);
  };

  const salvarContrato = (e) => {
    e.preventDefault();

    if (!cliente || !servicoId || !prestadorId || !dataAgendamento) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const valorCalculado = calcularValorServico(servicoId);

    if (idEmEdicao !== null) {
      const listaAtualizada = contratos.map((contrato) =>
        contrato.id === idEmEdicao
          ? {
              ...contrato,
              cliente,
              servicoId: Number(servicoId),
              prestadorId: Number(prestadorId),
              dataAgendamento,
              status,
              valorTotal: valorCalculado
            }
          : contrato
      );

      setContratos(listaAtualizada);
      alert('Contrato atualizado com sucesso!');
    } else {
      const novoContrato = {
        id: contratos.length > 0 ? Math.max(...contratos.map(c => c.id)) + 1 : 501,
        cliente,
        servicoId: Number(servicoId),
        prestadorId: Number(prestadorId),
        dataAgendamento,
        status,
        valorTotal: valorCalculado
      };

      setContratos([...contratos, novoContrato]);
      alert('Contrato cadastrado com sucesso!');
    }

    limparFormularioContrato();
  };

  const iniciarEdicao = (contrato) => {
    setIdEmEdicao(contrato.id);
    setCliente(contrato.cliente);
    setServicoId(contrato.servicoId.toString());
    setPrestadorId(contrato.prestadorId.toString());
    setDataAgendamento(contrato.dataAgendamento);
    setStatus(contrato.status);
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      setContratos(contratos.filter(contrato => contrato.id !== id));

      if (idEmEdicao === id) {
        limparFormularioContrato();
      }
    }
  };

  const limparAvaliacao = () => {
    setClienteAvaliacao('');
    setPrestadorAvaliacaoId('');
    setNota('5');
    setComentario('');
    setIdAvaliacaoEdicao(null);
  };

  const salvarAvaliacao = (e) => {
    e.preventDefault();

    if (!clienteAvaliacao || !prestadorAvaliacaoId || !comentario) {
      alert('Preencha todos os campos da avaliação!');
      return;
    }

    if (idAvaliacaoEdicao !== null) {
      const listaAtualizada = avaliacoes.map((avaliacao) =>
        avaliacao.id === idAvaliacaoEdicao
          ? {
              ...avaliacao,
              cliente: clienteAvaliacao,
              prestadorId: Number(prestadorAvaliacaoId),
              nota: Number(nota),
              comentario
            }
          : avaliacao
      );

      setAvaliacoes(listaAtualizada);
      alert('Avaliação atualizada com sucesso!');
    } else {
      const novaAvaliacao = {
        id: avaliacoes.length > 0 ? Math.max(...avaliacoes.map(a => a.id)) + 1 : 1,
        cliente: clienteAvaliacao,
        prestadorId: Number(prestadorAvaliacaoId),
        nota: Number(nota),
        comentario
      };

      setAvaliacoes([...avaliacoes, novaAvaliacao]);
      alert('Avaliação cadastrada com sucesso!');
    }

    limparAvaliacao();
  };

  const editarAvaliacao = (avaliacao) => {
    setIdAvaliacaoEdicao(avaliacao.id);
    setClienteAvaliacao(avaliacao.cliente);
    setPrestadorAvaliacaoId(avaliacao.prestadorId.toString());
    setNota(avaliacao.nota.toString());
    setComentario(avaliacao.comentario);
  };

  const excluirAvaliacao = (id) => {
    if (window.confirm('Deseja excluir esta avaliação?')) {
      setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== id));
    }
  };

  const estrelas = (quantidade) => '★'.repeat(quantidade) + '☆'.repeat(5 - quantidade);

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <span>›</span>
        <span>Gerenciamento</span>
      </div>

      <section className="titulo-padrao">
        <span>Gestão</span>
        <h3>Gerenciamento de contratos</h3>
        <p>Cadastre, edite e exclua contratos de prestação de serviços.</p>
      </section>

      <section className="crud-card">
        <h4>{idEmEdicao ? `Editando Contrato ID: ${idEmEdicao}` : 'Cadastrar Novo Contrato'}</h4>

        <form className="form-grid" onSubmit={salvarContrato}>
          <div className="campo-form">
            <label>Nome do Cliente</label>
            <input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Ex: João Silva" />
          </div>

          <div className="campo-form">
            <label>Selecione o Serviço</label>
            <select value={servicoId} onChange={(e) => setServicoId(e.target.value)}>
              <option value="">Escolha</option>
              {dadosIniciais.servicos.map(s => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>

          <div className="campo-form">
            <label>Selecione o Prestador</label>
            <select value={prestadorId} onChange={(e) => setPrestadorId(e.target.value)}>
              <option value="">Escolha</option>
              {dadosIniciais.prestadores.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="campo-form">
            <label>Data</label>
            <input type="date" value={dataAgendamento} onChange={(e) => setDataAgendamento(e.target.value)} />
          </div>

          <div className="campo-form">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Agendado">Agendado</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <div className="botoes-form">
            <button className="btn-salvar" type="submit">
              {idEmEdicao ? 'Atualizar' : 'Salvar Contrato'}
            </button>

            {idEmEdicao && (
              <button className="btn-cancelar" type="button" onClick={limparFormularioContrato}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="crud-card">
        <h4>Contratos Cadastrados</h4>

        <div className="tabela-wrapper">
          <table className="tabela-contratos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Prestador</th>
                <th>Data</th>
                <th>Status</th>
                <th>Valor</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {contratos.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                    Nenhum contrato registrado.
                  </td>
                </tr>
              ) : (
                contratos.map((contrato) => (
                  <tr key={contrato.id}>
                    <td>{contrato.id}</td>
                    <td style={{ fontWeight: '600' }}>{contrato.cliente}</td>
                    <td>{obterNomeServico(contrato.servicoId)}</td>
                    <td>{obterNomePrestador(contrato.prestadorId)}</td>
                    <td>{contrato.dataAgendamento}</td>
                    <td>
                      <span className={`status ${contrato.status.replace(' ', '-').toLowerCase()}`}>
                        {contrato.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: '800', color: '#0b3d91' }}>
                      R$ {Number(contrato.valorTotal).toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button className="btn-tabela btn-editar" onClick={() => iniciarEdicao(contrato)}>
                          Editar
                        </button>
                        <button className="btn-tabela btn-excluir" onClick={() => handleExcluir(contrato.id)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="crud-card">
        <h4>{idAvaliacaoEdicao ? 'Editar Avaliação' : 'Cadastrar Avaliação de Cliente'}</h4>

        <form className="form-grid" onSubmit={salvarAvaliacao}>
          <div className="campo-form">
            <label>Cliente</label>
            <input value={clienteAvaliacao} onChange={(e) => setClienteAvaliacao(e.target.value)} placeholder="Ex: Ana Souza" />
          </div>

          <div className="campo-form">
            <label>Prestador</label>
            <select value={prestadorAvaliacaoId} onChange={(e) => setPrestadorAvaliacaoId(e.target.value)}>
              <option value="">Escolha</option>
              {dadosIniciais.prestadores.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="campo-form">
            <label>Nota</label>
            <select value={nota} onChange={(e) => setNota(e.target.value)}>
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
          </div>

          <div className="campo-form">
            <label>Comentário</label>
            <input value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Digite a avaliação do cliente" />
          </div>

          <div className="botoes-form">
            <button className="btn-salvar" type="submit">
              {idAvaliacaoEdicao ? 'Atualizar Avaliação' : 'Salvar Avaliação'}
            </button>

            {idAvaliacaoEdicao && (
              <button className="btn-cancelar" type="button" onClick={limparAvaliacao}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="crud-card">
        <div className="secao-topo">
          <div>
            <h4>Avaliações dos Clientes</h4>
            <p>{avaliacoes.length} avaliações cadastradas</p>
          </div>
        </div>

        <div className="cards-avaliacoes">
          {avaliacoes.map((avaliacao) => (
            <div className="avaliacao-card" key={avaliacao.id}>
              <div className="avatar-avaliacao">
                {avaliacao.cliente.split(' ').map(nome => nome[0]).slice(0, 2).join('')}
              </div>
              <div className="estrelas">{estrelas(avaliacao.nota)}</div>
              <h4>{avaliacao.cliente}</h4>
              <p><strong>Prestador:</strong> {obterNomePrestador(avaliacao.prestadorId)}</p>
              <p className="comentario">"{avaliacao.comentario}"</p>

              <div className="acoes-card">
                <button className="btn-editar" onClick={() => editarAvaliacao(avaliacao)}>Editar</button>
                <button className="btn-excluir" onClick={() => excluirAvaliacao(avaliacao.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Gerenciamento;
