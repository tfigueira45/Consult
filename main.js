const codeInput = document.querySelector("#code");

function getValue(cd) {
    fetch("list.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(item => {
    
                if(item["Código"] == cd) {
                    const template = `
                        <table border="1">
                            <tr>
                                <td>Produto</td>
                                <td>Preço</td>
                                <td>Estoque</td>
                            </tr>
                            <tr>
                                <td>${item["Produto"]}</td>
                                <td>R$${item["Preço"]}</td>
                                <td>${!item["Estoque"] ? "Ñ Informado": item["Estoque"]}</td>
                            </tr>
                        </table>
                    `;
                    document.querySelector("div.result").innerHTML = template
                    
                } 
            })
        });
}

document.querySelector("div.enterCode button").addEventListener("click", () => {
    if(codeInput.value) {
        getValue(codeInput.value)
    } else {
        alert("Insira algo na entrada")
    }
})

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id')

    if(myParam){
        codeInput.value = myParam
        getValue(myParam)
    }
})


