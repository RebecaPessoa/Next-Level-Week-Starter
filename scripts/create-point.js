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

    fetch(url)
        .then(res => res.json()) //função anonima que retorna um valor / também poderia ser:  .then((res)=>{return res.json()})
        .then(cities => {
            //estrutura de repetição para injetar no html
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`

            }
            citySelect.disabled = false

        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //a função é chamada sem parentesis, pois só será executada quando "change" for acionado


