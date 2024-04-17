const codeInput = document.querySelector("#code");

function getValue(cd) {
    fetch("Lista de Produtos.xlsx")
        .then(response => response.arrayBuffer())
        .then(data => {
            var workbook = XLSX.read(new Uint8Array(data), {type: 'array'});
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log(xlData);
            xlData.forEach(item => {
    
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


