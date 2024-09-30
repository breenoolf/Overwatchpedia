function pesquisar() {
    // Obtém o elemento HTML onde os resultados da pesquisa serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Obtém o valor do campo de pesquisa, remove espaços em branco e converte para minúsculas
    let campoPesquisa = document.getElementById('campo-pesquisa').value.trim().toLowerCase();

    // Verifica se o campo de pesquisa está vazio
    if (!campoPesquisa) {
        // Se estiver vazio, exibe uma mensagem informando que nenhum personagem foi encontrado
        section.innerHTML = '<p>Nenhum personagem foi encontrado. Por favor busque algo relacionado a um personagem.</p>';
        return;
    }

    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = '';
    let tituloNormalizado = '';
    let campoPesquisaNormalizado = '';
    let tagsNormalizado = '';
    // Itera sobre cada dado (personagem) no array de dados
    for (let dado of dados) {
        // Normaliza o título do personagem e o termo de pesquisa para remover acentos e caracteres especiais
        tituloNormalizado = dado.titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        campoPesquisaNormalizado = campoPesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        tagsNormalizado = dado.tags.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // Verifica se o título normalizado ou a descrição do personagem contém o termo de pesquisa normalizado
        if (tituloNormalizado.includes(campoPesquisaNormalizado) || dado.descricao.includes(campoPesquisaNormalizado) || tagsNormalizado.includes(campoPesquisaNormalizado)) {
            // Se encontrar uma correspondência, cria um novo elemento HTML para exibir os detalhes do personagem
            resultados += `
                <div class="item-resultado">
                    <h2>${dado.titulo}</h2>
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Clique aqui para saber mais sobre a personagem.</a>
                </div>
            `;
        }
    }

    if (!resultados) { //igual a NOT resultados
        resultados = '<p>Nenhum personagem foi encontrado.</p>'
    }

    // Atualiza o conteúdo do elemento HTML com os resultados da pesquisa
    section.innerHTML = resultados;
}

        