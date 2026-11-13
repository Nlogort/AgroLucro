let listaProdutos = []

fetch('produtos.json')
    .then(resposta => resposta.json())
    .then(dados => {
        listaProdutos = dados;
        console.log("Produtos carregados com sucesso!", listaProdutos.length);

        preencherDatalist(listaProdutos);
    })
    .catch(erro => console.log("Erro ao carregar o JSON:", erro));
// Função para popular o datalist com as opções do JSON
function preencherDatalist(produtos) {
    const datalist = document.getElementById('produtos-sugeridos');

    //Limpa o datalist antes de preencher (para garantir que não duplique)
    datalist.innerHTML = "";

    //para cada produto ma lista criamos a tag <option>
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.nome;//aparece a sugestao do nome
        datalist.appendChild(option);//adiciona a opção dentro do datalist
    })
}
//peguei o html

const inputBusca = document.getElementById('busca-produto');
const caixaResultados = document.getElementById('lista-resultados');
const botaoBuscar = document.getElementById('btn-buscar');

//escuta cada tecla digitada pelo usuario
inputBusca.addEventListener('input', (e) => {
    const textoDigitado = e.target.value.toLowerCase().trim();
    //se o usuario apagar tudo limpa caixa de resultados e para por aqui
    if (textoDigitado === "") {
        caixaResultados.innerText = "";
        return;
    }
    // Filtra o nosso JSON de produtos (compara se o nome inclui o que foi digitado)
    const produtosFiltrados = listaProdutos.filter(produto => produto.nome.toLowerCase().includes(textoDigitado));
    // Mostra os resultados na tela em formato de div
    exibirResultadosNaTela(produtosFiltrados);
});
// Função que cria as divs para cada resultado encontrado
function exibirResultadosNaTela(produtos) {
    // Se não achar nada, mostra um aviso
    if (produtos.length === 0) {
        caixaResultados.innerHTML = `<div class="item-resultado">Nenhum produto encontrado</div>`;
        return;
    }

    // Para cada produto encontrado, criamos uma <div> usando .map() e .join('')

    caixaResultados.innerHTML = produtos.map(produto => 
        `
        <div class="item-resultado" onclick="selecionarProduto('${produto.nome}', ${produto.preco})">
            <div class="produto-nome"><strong>${produto.nome}</strong></div>
            <div class="produto-detalhes">
                <span class="badge-embalagem">${produto.embalagem}</span> 
                <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
            </div>
        </div>
    `
    ).join('')

}
// Função opcional para quando o usuário clicar em um produto da lista
function selecionarProduto(nome, preco) {
    inputBusca.value = nome; // Joga o nome no input
    caixaResultados.innerHTML = ""; // Fecha a caixinha de resultados
    console.log(`Produto selecionado: ${nome} por R$ ${preco}`);
}




// 1. O usuário clica no botão "Buscar"
botaoBuscar.addEventListener('click', () => {
    const termoPesquisado = inputBusca.value.trim();

    // 2. Procuramos na nossa lista usando o .find() que você entendeu
    const produtoEncontrado = listaProdutos.find(produto => 
        produto.nome.toLowerCase() === termoPesquisado.toLowerCase()
    );

    // 3. Verificamos se achamos e "chamamos" a variável para preencher a tela
    if (produtoEncontrado) {
        // Aqui pegamos os elementos do HTML e jogamos os dados de dentro da nossa variável
        document.getElementById('res-preco-ceasa').textContent = `R$ ${produtoEncontrado.preco.toFixed(2)}`;
        
        console.log("Mostrando dados do produto:", produtoEncontrado.nome);
    } else {
        alert("Produto não encontrado!");
    }
});

function selecionarProduto(nome, preco){
    inputBusca.value = nome;
    caixaResultados.innerHTML = "";
  
    // 1. Pegamos o painel da calculadora pelo ID e tiramos a classe que o esconde (ou adicionamos uma que mostra)
    const painelCalc = document.getElementById('painel-calculadora');
    painelCalc.classList.remove('painel-escondido');
    painelCalc.classList.add('painel-visivel');

    // 2. Jogamos o nome e o preço lá dentro dos spans da calculadora
    document.getElementById('calc-nome-produto').textContent = nome;
    document.getElementById('calc-preco-ceasa').textContent = preco.toFixed(2);

    console.log(`Produto selecionado para cálculo: ${nome} por R$ ${preco}`);
}

const campoBusca = document.querySelector('.campo')
inputBusca.addEventListener('focus',()=>{
    campoBusca.classList.add('expandido')
})

function selecionarProduto(nome,preco){
    inputBusca.value=nome;//joga o nome no input
    caixaResultados.innerHTML="";

    // 1. Pega o painel da calculadora lá no HTML
    const painelCalculadora = document.getElementById('painel-calculadora');

    // 2. Tira a classe que esconde e coloca a classe que o torna visível
    painelCalculadora.classList.remove('painel-escondido');
    painelCalculadora.classList.add('painel-visivel');

    // 3. Preenche os textos de lá com os dados vindos do JSON
    document.getElementById('calc-nome-produto').textContent = nome;
    document.getElementById('calc-preco-ceasa').textContent = preco.toFixed(2);

    console.log(`Produto pronto para cálculo: ${nome} - R$ ${preco}`);
}