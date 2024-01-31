const axios = require('axios');
const FormData = require('form-data');

const imagemExemplo = "data:image/jpeg;base64UklGRlAiAABXRUJQVlA4IEQiAADQtgCdASpYAq4BPlEokUajoqGhI";

async function enviarImagens(imagens) {

    const recursoAPI = 'https://barramento-teste.fiocruz.br/fiogestao/cadastrar_galeria';

    for (let i = 0; i < imagens.length; i++) {

        const imagemAtual = imagens[i];

        try {

            const form = new FormData();
            form.append('imagem', imagemAtual.imagem);
            form.append('wiki_id', imagemAtual.wiki_id);

            // Envia a imagem atual para o recurso da API usando form-data
            const resposta = await axios.post(recursoAPI, form, {
                headers: {
                ...form.getHeaders(),
                },
            });

            // Faça algo com a resposta, se necessário
            console.log(`Imagem ${i + 1} enviada com sucesso: ${resposta.data}`);

            // Adiciona um delay (por exemplo, 1 segundo) entre as requisições
            await delay(1000);

    } catch (erro) {

        // Trata os erros, se necessário
        console.error(`Erro ao enviar a imagem ${i + 1}: ${erro.message}`);
    }
  }
}

// Função para adicionar um delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Exemplo de uso
const colecaoDeImagens = [{
    imagem: imagemExemplo,
    wiki_id: 1
},{
    imagem: imagemExemplo,
    wiki_id: 1
},{
    imagem: imagemExemplo,
    wiki_id: 1
}];

enviarImagens(colecaoDeImagens);