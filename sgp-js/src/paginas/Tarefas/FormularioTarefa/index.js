import { useEffect, useState } from "react";
import { atualizarTarefa, cadastrarTarefa } from "../../../servicos/tarefas";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { useProjetos } from "../../../hooks/useProjetos";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const OPCOES_STATUS = [
    "Planejada",
    "Em andamento",
    "Concluída",
    "Cancelada"
];

function FormularioTarefa({ tarefa }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazoEntrega, setPrazoEntrega] = useState("");
    const [status, setStatus] = useState("");
    const [definirLembrete, setDefinirLembrete] = useState(false);
    const [responsavel, setResponsavel] = useState({});
    const [projetoAssociado, setProjetoAssociado] = useState({});

    const navegarPara = useNavigate();

    const { usuarios, carregarUsuarioPeloId, usuario } = useUsuarios();

    const { projetos, carregarProjetoPeloId, projeto } = useProjetos();

    useEffect(() => {
        if (tarefa) {
            setTitulo(tarefa.titulo || "");
            setDescricao(tarefa.descricao || "");
            setPrazoEntrega(tarefa.prazoEntrega || "");
            setStatus(tarefa.status || "");
            setDefinirLembrete(tarefa.definirLembrete);
            setResponsavel(tarefa.responsavel || {});
            setProjetoAssociado(tarefa.projeto || {});
        }
    }, [tarefa]);

    const selecionarResponsavel = async (id) => {
        await carregarUsuarioPeloId(id);
        setResponsavel(usuario)
    };

    const selecionarProjetoAssociado = async (id) => {
        await carregarProjetoPeloId(id);
        setProjetoAssociado(projeto)
    };

    const submeterFormulario = async (event) => {
        event.preventDefault();

        const dadosTarefa = {
            titulo,
            descricao,
            prazoEntrega: format(prazoEntrega, "dd/MM/yyyy"),
            status,
            definirLembrete,
            responsavel,
            projeto: projetoAssociado
        };

        try {
            if (tarefa && tarefa.id) {
                await atualizarTarefa(tarefa.id, dadosTarefa);
                alert("Tarefa atualizada com sucesso!");
                navegarPara("/tarefas");
            } else {
                await cadastrarTarefa(dadosTarefa);
                alert("Tarefa cadastrada com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente.");
        }
    }

    return (
        <div className="container mb-4">
            <form className="row g-3 justify-content-center" onSubmit={submeterFormulario}>
                <div className="col-md-8 col-12">
                    <div className="row g-3 d-flex">
                        <div className="col-12">
                            <label htmlFor="titulo" className="form-label">
                                Título:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                placeholder="Digite o título da tarefa..."
                                defaultValue={titulo}
                                onChange={(event) => setTitulo(event.target.value)}
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
                                defaultValue={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                            />
                        </div>

                        <div className="col-lg-6 col-12">
                            <label htmlFor="prazoEntrega" className="form-label">
                                Data e Hora:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="prazoEntrega"
                                defaultValue={prazoEntrega}
                                onChange={(event) => setPrazoEntrega(event.target.value)}
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
                                defaultValue={status || "DEFAULT"}
                                onChange={(event) => setStatus(event.target.value)}
                                required
                            >
                                <option value={"DEFAULT"} disabled>Selecione uma opção:</option>
                                {OPCOES_STATUS.map((opcao, indice) => (
                                    <option value={opcao} key={indice}>
                                        {opcao}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-6 col-12">
                            <label htmlFor="responsavel" className="form-label">
                                Responsável:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <select
                                className="form-control"
                                id="responsavel"
                                defaultValue={responsavel?.id || "DEFAULT"}
                                onChange={(event) => selecionarResponsavel(event.target.value)}
                                required
                            >
                                <option value={"DEFAULT"} disabled>Selecione um usuário:</option>
                                {usuarios?.map((usuario) => (
                                    <option value={usuario.id} key={usuario.id}>
                                        {usuario.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-6 col-12">
                            <label htmlFor="projeto" className="form-label">
                                Projeto:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <select
                                className="form-control"
                                id="projeto"
                                defaultValue={projetoAssociado?.id || "DEFAULT"}
                                onChange={(event) => selecionarProjetoAssociado(event.target.value)}
                                required
                            >
                                <option value={"DEFAULT"} disabled>Selecione um projeto:</option>
                                {projetos?.map((projeto) => (
                                    <option value={projeto.id} key={projeto.id}>
                                        {projeto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12">
                            <div className="form-check text-start">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={definirLembrete}
                                    onChange={() => setDefinirLembrete(!de)}
                                />
                                <label className="form-check-label">
                                    Definir lembrete
                                </label>
                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-success mt-3 w-100" type="submit">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormularioTarefa;