function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    //busca todos os estados e transforma em json
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //função anonima que retorna um valor / também poderia ser:  .then((res)=>{return res.json()})
        .then(states => {
            //estrutura de repetição para injetar no html
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text



    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //limpa o campo de cidades para recarregar
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) //função anonima que retorna um valor / também poderia ser:  .then((res)=>{return res.json()})
        .then(cities => {

            //estrutura de repetição para injetar no html
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }
            citySelect.disabled = false

        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //a função é chamada sem parentesis, pois só será executada quando "change" for acionado

//ITENS DE COLETA
//todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
//usando a nodeList de items do grid:
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")



let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //adicionar ou remover uma classe 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id /*busca o id dos itens clicados*/


    //verificar se há itens selecionados
    //se sim, pegar itens selecionados

    const alredySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //se item == itemId é true, o valor é atribuido a itemFound 
        return itemFound
    })


    //se ja estiver selecionado, tirar da seleção

    if (alredySelected >= 0) {

        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else //se não estiver selecionado, adicionar a seleção

        selectedItems.push(itemId)

    //atualizar o campo escondido (input hidden) com os dados selecionados
    collectedItems.value = selectedItems
}
