function Alerta({ cor, mensagem }) {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-8 col-12">
                <div className={`alert alert-${cor}`} role="alert">
                    {mensagem}
                </div>
            </div>
        </div>
    )
}

export default Alerta;