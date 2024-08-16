function Botao({ cor, tamanho = "md", texto, aoClicar }) {
    return (
        <button className={`btn btn-${cor} btn-${tamanho} ms-2`} onClick={aoClicar}>{texto}</button>
    )
}

export default Botao;