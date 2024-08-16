import { useEffect, useState } from "react";
import { atualizarProjeto, cadastrarProjeto } from "../../../servicos/projetos";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../../../hooks/useUsuarios";

const OPCOES_STATUS = [
    "Planejado",
    "Em andamento",
    "Concluído",
    "Cancelado"
];

function FormularioProjeto({ projeto }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [status, setStatus] = useState("");
    const [gerente, setGerente] = useState("");

    const navegarPara = useNavigate();

    const { usuarios, carregarUsuarioPeloId, usuario } = useUsuarios();

    useEffect(() => {
        if (projeto) {
            setNome(projeto.nome || "");
            setDescricao(projeto.descricao || "");
            setDataInicio(projeto.dataInicio || "");
            setDataFim(projeto.dataFim || "");
            setStatus(projeto.status || "");
            setGerente(projeto.gerente || {});
        }
    }, [projeto]);

    const selecionarGerente = async (id) => {
        await carregarUsuarioPeloId(id);
        setGerente(usuario)
    };

    const submeterFormulario = async (event) => {
        event.preventDefault();

        const dadosProjeto = {
            nome,
            descricao,
            dataInicio,
            dataFim,
            status,
            gerente
        };

        try {
            if (projeto && projeto.id) {
                await atualizarProjeto(projeto.id, dadosProjeto);
                alert("Projeto atualizado com sucesso!");
                navegarPara("/projetos");
            } else {
                await cadastrarProjeto(dadosProjeto);
                alert("Projeto cadastrado com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Ocorreu um erro ao salvar o projeto. Por favor, tente novamente.");
        }
    };

    return (
        <div className="container mb-4">
            <form className="row g-3 justify-content-center" onSubmit={submeterFormulario}>
                <div className="col-md-8 col-12">
                    <div className="row g-3 d-flex">
                        <div className="col-12">
                            <label htmlFor="nome" className="form-label">
                                Nome do Projeto:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="descricao" className="form-label">
                                Descrição:
                            </label>
                            <textarea
                                className="form-control"
                                id="descricao"
                                value={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="dataInicio" className="form-label">
                                Data de Início:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataInicio"
                                value={dataInicio}
                                onChange={(event) => setDataInicio(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="dataFim" className="form-label">
                                Data de Fim:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataFim"
                                value={dataFim}
                                onChange={(event) => setDataFim(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="status" className="form-label">
                                Status:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <select
                                className="form-control"
                                id="status"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                required
                            >
                                <option value="">Selecione um status</option>
                                {OPCOES_STATUS.map((opcao, index) => (
                                    <option key={index} value={opcao}>
                                        {opcao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="gerente" className="form-label">
                                Gerente:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <select
                                className="form-control"
                                id="gerente"
                                value={gerente?.id || "DEFAULT"}
                                onChange={(event) => selecionarGerente(event.target.value)}
                                required
                            >
                                <option value="">Selecione um gerente</option>
                                {usuarios?.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-success mt-3 w-100" type="submit">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormularioProjeto;
