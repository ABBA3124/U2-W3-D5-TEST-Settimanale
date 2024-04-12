document.addEventListener("DOMContentLoaded", function () {
  submiteProduct()
  updateProduct()
  deleteProduct()
  deleteAllProducts()
})

function submiteProduct() {
  //click submit
  document.getElementById("submitProduct").addEventListener("click", function () {
    // dati contenuti dentro input
    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    }
    // faccio richiesta POST per aggiungere nuovo prodotto
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E",
      },
      body: JSON.stringify(productData),
    })
    //controlli
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error))
  })
}

function updateProduct() {
  document.getElementById("updateProduct").addEventListener("click", function () {
    const productId = document.getElementById("productId").value
    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    }

    //richiesta PUT PRODUCT
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error))
  })
}


function deleteProduct() {
  document.getElementById("deleteProduct").addEventListener("click", function () {
    const productId = document.getElementById("productId").value
    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    }

    //richiesta DELETE PRODUCT
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error))
  })
}



//voglio provare a creare un delete all product con un allert di conferma
//dopo voglio provare che inserendo nel campo di input un codice tipo. /DELETEALL sblocca il pulsante delete all e con allert di conferma 
function deleteAllProducts() {
document.getElementById('deleteAllProduct').addEventListener('click', function() {
    

    //con il get prendo dutti i i prodotti cosi tramite tutti id raccolti cancello tutto 
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E" 
        }
    })
    .then(response => response.json())
    .then(products => {
        // invio una richiesta DELETE per ciascuno quindi un delete all
        products.forEach(product => {
            fetch(`https://striveschool-api.herokuapp.com/api/product/${product._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E" 
                }
            })
            .then(response => response.json())
            .then(data => console.log('Product deleted:', data))
            .catch(error => console.error('Error:', error))
        })
    })
    .catch(error => console.error('Error:', error))
})
}


// DA SISTEMARE FA SCHIFO
//aggiungo una funzionalità che verifica se continee qualcosa mostra altrimenti no ( prima della mod una volta apparsi restavano in quel modo)
//adesso voglio aggiungere una funzionalita che ho citato soprache: quando nel campo di input viene inserito /DELETEALL sblocca il pulsante delete all e con allert di conferma)
document.getElementById("idForm").addEventListener("input", function () {
    const ciòCheVieneInserito = document.querySelectorAll("#idForm input")
    const valoreInserito = Array.from(ciòCheVieneInserito).some(input => input.value.trim() !== '')

    // se rileva un valore differente da campo vuoto 
    if (valoreInserito) {
        document.getElementById("updateProduct").style.display = "block"
        document.getElementById("deleteProduct").style.display = "block"
        document.getElementById("deleteAllProduct").style.display = "block"
    } else {
        document.getElementById("updateProduct").style.display = "none"
        document.getElementById("deleteProduct").style.display = "none"
        document.getElementById("deleteAllProduct").style.display = "none"
    }
})






//   document.getElementById("updateProduct").style.display = "block"
//   document.getElementById("deleteProduct").style.display = "block"
//   document.getElementById("deleteAllProduct").style.display = "block"
// })
