export const buscarDetalhesEndereco = async (cep) => {
    const cepNumerico = cep.replace(/\D/g, '');

    if (cepNumerico.length !== 8) {
        throw new Error("CEP inválido. Deve conter 8 dígitos.");
    }

    const url = `https://viacep.com.br/ws/${cepNumerico}/json/`;

    const response = await fetch(url);
    const dados = await response.json();

    if (dados.erro) {
        throw new Error("CEP não encontrado.");
    }

    return {
        rua: dados.logradouro,
        cidade: dados.localidade,
        estado: dados.uf,
    };
};
