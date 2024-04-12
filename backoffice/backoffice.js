document.addEventListener("DOMContentLoaded", function () {
  submiteProduct()
  updateProduct()
  deleteProduct()
  deleteAllProducts()
  displayAllProducts()
  caricaDatiQuandoAccadeModifica()
  resetButton()


})

const Token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E"
const fetchUrl = "https://striveschool-api.herokuapp.com/api/product/"

function submiteProduct() {
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
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify(productData),
    })
      //controlli
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        refresh()
      })
      .catch((error) => console.error("Error:", error))
  })
}

const resetButton = function () {
  document.getElementById("resetButton").addEventListener("click", function () {
    if (confirm("Sei sicuro di voler resettare il form?")) {
    }
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
    fetch(`${fetchUrl}${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        alert("Prodotto modificato con successo.")
        refresh()
      })
      .catch((error) => console.error("Error:", error))
  })
}

function deleteProduct() {
  document.getElementById("deleteProduct").addEventListener("click", function () {
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      const productId = document.getElementById("productId").value
      const productData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value,
      }

      //richiesta DELETE PRODUCT
      fetch(`${fetchUrl}${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          alert("Prodotto eliminato con successo.")
          refresh()
        })
        .catch((error) => console.error("Error:", error))
    }
  })
}

//voglio provare a creare un delete all product con un allert di conferma FATTOOOOOOOOOOOOOOOO
//dopo voglio provare che inserendo nel campo di input un codice tipo. /DELETEALL sblocca il pulsante delete all e con allert di conferma   FATTOOOOOOOOOOOOOOOO
function deleteAllProducts() {
  document.getElementById("deleteAllProduct").addEventListener("click", function () {
    if (confirm("Sei sicuro di voler eliminare tutti i prodotti?")) {
      //con il get prendo dutti i i prodotti cosi tramite tutti id raccolti cancello tutto
      fetch(fetchUrl, {
        method: "GET",
        headers: {
          Authorization: Token,
        },
      })
        .then((response) => response.json())
        .then((products) => {
          // invio una richiesta DELETE per ciascuno quindi un delete all
          products.forEach((product) => {
            fetch(`${fetchUrl}${product._id}`, {
              method: "DELETE",
              headers: {
                Authorization: Token,
              },
            })
              .then((response) => response.json())

              .then((data) => {
                console.log(data)
                console.log("Product deleted:", data)
                refresh()
              })
              .catch((error) => console.error("Error:", error))
          })
        })
        .catch((error) => console.error("Error:", error))
    }
  })
}

const refresh = function () {
  location.reload()
}

document.getElementById("searchProduct").addEventListener("click", function () {
  const productId = document.getElementById("productId").value.trim() // ottieni l'ID del prodotto e rimuovi spazi iniziali e finali

  // Effettua una richiesta GET per ottenere i dettagli del prodotto corrispondente all'ID inserito
  fetch(`${fetchUrl}${productId}`, {
    method: "GET",
    headers: {
      Authorization: Token,
    },
  })
    .then((response) => {
      if (response.ok) {
        // Se la risposta è OK, il prodotto è stato trovato
        return response.json() // Converte la risposta in JSON
      } else {
        // Se la risposta non è OK, il prodotto non è stato trovato
        throw new Error("ID non trovato, assicurati di aver inserito i dati correttamente")
        refresh()
      }
    })
    .then((product) => {
      // Se il prodotto è stato trovato, popola gli altri campi input con i suoi dati
      document.getElementById("name").value = product.name
      document.getElementById("description").value = product.description
      document.getElementById("brand").value = product.brand
      document.getElementById("imageUrl").value = product.imageUrl
      document.getElementById("price").value = product.price
      alert("Prodotto Trovato e Caricato con successo, Una volta completate le modifiche effettua Update")
    })
    .catch((error) => {
      // Se c'è un errore nella richiesta o il prodotto non è stato trovato, mostra un alert
      alert("ID non trovato, assicurati di aver inserito i dati correttamente")
      refresh()
    })
})

// DA SISTEMARE FA SCHIFO FATTOOOOOOOOOOOOOOOO
//aggiungo una funzionalità che verifica se continee qualcosa mostra altrimenti no ( prima della mod una volta apparsi restavano in quel modo) FATTOOOOOOOOOOOOOOOO
//adesso voglio aggiungere una funzionalita che ho citato soprache: quando nel campo di input viene inserito /DELETEALL sblocca il pulsante delete all e con allert di conferma) FATTOOOOOOOOOOOOOOOO
document.getElementById("idForm").addEventListener("input", function () {
  // valore inserito nei campi di input
  const inputs = document.querySelectorAll("#idForm input")
  const inputValues = Array.from(inputs).map((input) => input.value.trim().toUpperCase()) //non so se tenere il trim o meno (credo sia più opportuno toglierlo perchè è un comando admin)

  ///check input se continee /deleteall siccome abbiamo inserito il .trim() non importano i caratteri o spazi ecc,....
  const deleteAllEntered = inputValues.includes("/DELETEALL")

  // Se deleteAllEntered ha come valore /deleteall, mostra il pulsante deleteall, altrimenti risulta nascosto
  // Se "/DELETEALL" è stato inserito, chiedi conferma prima di entrare in modalità ADMIN
  if (deleteAllEntered) {
    // ho provato con allert ma volevo dare conferma di ciò e quindi ho modificato aggiungendo un confirma (adesso chiede si o no)
    const confirmation = confirm(
      "ATTENZIONE !!! inserendo questo comando in console stai entrando in modalità ADMIN vuoi procedere?"
    )
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
  const hasValue = inputValues.some((value) => value !== "")

  // se il valore è diverso dal vuoto mostra anche gli altri pulsanti
  if (hasValue) {
    document.getElementById("updateProduct").style.display = "block"
    document.getElementById("deleteProduct").style.display = "block"
  } else {
    //altrimenti nasconde tutti gli altri pulsanti
    document.getElementById("updateProduct").style.display = "none"
    document.getElementById("deleteProduct").style.display = "none"
  }
})


function displayAllProducts() {
  fetch(fetchUrl, {
    method: "GET",
    headers: {
      Authorization: Token,
    },
  })
    .then((response) => {
      console.log('Risposta Ricevuta');
      if (!response.ok) {
        throw new Error(`HTTPS errore: ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      console.log('Prodotti caricati:', products.length);
      const container = document.getElementById("prova");
      const productsList = document.createElement("ul");
      productsList.className = "list-group";

      products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.className = "list-group-item d-flex flex-column flex-md-row align-items-md-center";
        productItem.innerHTML = `
        <div class="flex-shrink-0 mb-3 mb-md-0 me-md-3">
        <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}" style="width: 100px; height: auto;">
        </div>
        <div class="flex-grow-1">
        <div class="fw-bold">ID: <span class="text-info">${product._id}</span></div>
        <div>Name: ${product.name}</div>
        <div>Description: ${product.description}</div>
        <div>Brand: ${product.brand}</div>
        <div>Price: <span class="fw-bold">${product.price}€</span></div>
        </div>
        `;
        productsList.appendChild(productItem);
      });

      container.innerHTML = "";
      container.appendChild(productsList);
    })
    .catch((error) => {
      console.error("Impossibile caricare i prodotti:", error);
    });
}



// // Funzione per caricare tutti i prodotti all'interno di un div specificato
// function displayAllProducts() {
//   // Effettua una richiesta GET per ottenere tutti i prodotti
//   fetch(fetchUrl, {
//     method: "GET",
//     headers: {
//       Authorization: Token,
//     },
//   })
//     .then((response) => response.json())
//     .then((products) => {
//       const productsList = document.createElement("ul") 
//       productsList.className = "list-group" // add class list-group 

//         products.forEach((product) => {
//         const productItem = document.createElement("li") 
//         productItem.className = "list-group-item d-flex flex-column flex-md-row align-items-md-center" 
//         productItem.innerHTML = `
//       <div class="flex-shrink-0 mb-3 mb-md-0 me-md-3">
//       <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}" style="width: 100px; height: auto;">
//       </div>
//       <div class="flex-grow-1">
//       <div class="fw-bold">ID: <span class="text-info">${product._id}</span></div>
//       <div>Name: ${product.name}</div>
//       <div>Description: ${product.description}</div>
//       <div>Brand: ${product.brand}</div>
//       <div>Price: <span class="fw-bold">${product.price}€</span></div>
//       </div>
//   ` 
//         productsList.appendChild(productItem) 
//       })

//       const container = document.getElementById("prova") 
//       container.innerHTML = "" 
//       container.appendChild(productsList)
//     })
//     .catch((error) => console.error("Error:", error))
// }





document.getElementById("productId").addEventListener("input", function () {
  const productIdValue = this.value.trim()
  const submitProductButton = document.getElementById("submitProduct")
  //aggiunto anche al carica dati
  // Se il valore di productId non è vuoto
  if (productIdValue !== "") {
    submitProductButton.style.display = "none"
  } else {
    submitProductButton.style.display = "block"
  }
})

function caricaDatiQuandoAccadeModifica() {
  const params = new URLSearchParams(window.location.search)
  const productId = params.get("productId")
  //aggiunto anche al carica dati cosi quando mi inserisce nell'input il valore viene tolto
  const submitProductButton = document.getElementById("submitProduct")
  if (productId) {
    document.getElementById("productId").value = productId
    searchProduct()
    submitProductButton.style.display = "none"
  }
}

function searchProduct() {
  const productId = document.getElementById("productId").value.trim()
  if (!productId) {
    alert("Id Non Trovato.")
    return
  }

  fetch(`${fetchUrl}${productId}`, {
    method: "GET",
    headers: {
      Authorization: Token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("ID non trovato, assicurati di aver inserito i dati correttamente")
      }
      return response.json()
    })
    .then((product) => {
      document.getElementById("name").value = product.name
      document.getElementById("description").value = product.description
      document.getElementById("brand").value = product.brand
      document.getElementById("imageUrl").value = product.imageUrl
      document.getElementById("price").value = product.price
      document.getElementById("updateProduct").style.display = "block"
      document.getElementById("deleteProduct").style.display = "block"
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("Prodotto eliminato con successo.")
      window.history.back()
    })
}

















