const fs = require('fs');

const caminhoArquivo = './source.json';

fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo ${caminhoArquivo}: ${err.message}`);
    return;
  }

  console.log('Conteúdo do arquivo:', data);

  const jsonData = JSON.parse(data);

  if (jsonData && jsonData.categorias) {
    const categorias = jsonData.categorias.categoria;

    // Aqui ocorreu o erro
    const objetoHierarquico = construirObjetoHierarquico(categorias);
    console.log(JSON.stringify(objetoHierarquico, null, 2));
  } else {
    console.error('O arquivo JSON não tem o formato esperado.');
  }
});

function construirObjetoHierarquico(categorias, categoriaPaiId = "0") {
  return categorias
    .filter(categoria => categoria.categoria_pai_id === categoriaPaiId)
    .map(categoria => {
      const subcategorias = construirObjetoHierarquico(categorias, categoria.id_categoria);
      if (subcategorias.length > 0) {
        return { ...categoria, subcategorias };
      } else {
        return { ...categoria };
      }
    });
}