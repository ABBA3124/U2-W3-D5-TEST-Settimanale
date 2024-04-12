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


//voglio creare una logica che quando si scrive un id nel nostro campo di input con id= productId  e questo id esiste deve inserisca tutti i dati dentro input corrispondenti,  se non esiste deve dare un allert "tipo: id errato o non esistente" 




// DA SISTEMARE FA SCHIFO
//aggiungo una funzionalità che verifica se continee qualcosa mostra altrimenti no ( prima della mod una volta apparsi restavano in quel modo)
//adesso voglio aggiungere una funzionalita che ho citato soprache: quando nel campo di input viene inserito /DELETEALL sblocca il pulsante delete all e con allert di conferma)
document.getElementById("idForm").addEventListener("input", function () {
    // valore inserito nei campi di input
    const inputs = document.querySelectorAll("#idForm input")
    const inputValues = Array.from(inputs).map(input => input.value.trim().toUpperCase()) //non so se tenere il trim o meno (credo sia più opportuno toglierlo perchè è un comando admin)

    ///check input se continee /deleteall siccome abbiamo inserito il .trim() non importano i caratteri o spazi ecc,....
    const deleteAllEntered = inputValues.includes("/DELETEALL")

    // Se deleteAllEntered ha come valore /deleteall, mostra il pulsante deleteall, altrimenti risulta nascosto
    // Se "/DELETEALL" è stato inserito, chiedi conferma prima di entrare in modalità ADMIN
    if (deleteAllEntered) {
        // ho provato con allert ma volevo dare conferma di ciò e quindi ho modificato aggiungendo un confirma (adesso chiede si o no)
        const confirmation = confirm("ATTENZIONE !!! inserendo questo comando in console stai entrando in modalità ADMIN vuoi procedere?")
        // Se si seleziona si mostra il pulsante deleteall
        if (confirmation) {
            document.getElementById("deleteAllProduct").style.display = "block"
        } else {
            document.getElementById("deleteAllProduct").style.display = "none"
        }
    } else {
        document.getElementById("deleteAllProduct").style.display = "none"
    }

    //check input value se contiene qualcosa
    const hasValue = inputValues.some(value => value !== '')

    // se il valore è diverso dal vuoto mostra anche gli altri pulsanti
    if (hasValue) {
        document.getElementById("updateProduct").style.display = "block"
        document.getElementById("deleteProduct").style.display = "block"
    } else { //altrimenti nasconde tutti gli altri pulsanti
        document.getElementById("updateProduct").style.display = "none"
        document.getElementById("deleteProduct").style.display = "none"
    }
})




