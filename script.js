let listaProdutos =[]

fetch('produtos.json')
.then(resposta => resposta.json())
.then(dados =>{
    listaProdutos=dados;
    console.log("Produtos carregados com sucesso!", listaProdutos.length);

    preencherDatalist(listaProdutos);
})
.catch(erro => console.log("Erro ao carregar o JSON:", erro));
// Função para popular o datalist com as opções do JSON
function preencherDatalist(produtos){
    const datalist = document.getElementById('produtos-sugeridos');

    //Limpa o datalist antes de preencher (para garantir que não duplique)
    datalist.innerHTML="";

//para cada produto ma lista criamos a tag <option>
    produtos.forEach(produto =>{
        const option = document.createElement('option');
        option.value=produto.nome;//aparece a sugestao do nome
        datalist.appendChild(option);//adiciona a opção dentro do datalist
    })
}