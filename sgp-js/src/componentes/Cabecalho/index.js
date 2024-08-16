import { FaBars } from "react-icons/fa";
import Botao from "../Botao";

function Cabecalho({
    titulo,
    textoBotao,
    exibirFormulario = false,
    setExibirFormulario,
    exibirMenu = true,
    setExibirMenu
}) {
    return (
        <div className="container mt-3 mb-4">
            <div className="d-flex justify-content-center">
                <div className="col-md-8 col-12">
                    <div className="d-flex justify-content-between">
                        <h1 className="text-white">{titulo}</h1>

                        <div className="d-flex align-items-center">
                            {textoBotao && (
                                <Botao
                                    cor={exibirFormulario ? "danger" : "success"}
                                    texto={textoBotao}
                                    aoClicar={() => setExibirFormulario(!exibirFormulario)}
                                />
                            )}
                            <div className="d-md-none p-2">
                                <button className="btn btn-primary" onClick={() => setExibirMenu(!exibirMenu)}>
                                    <FaBars />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cabecalho;