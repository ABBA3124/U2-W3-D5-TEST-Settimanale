document.addEventListener("DOMContentLoaded", function () {
  submiteProduct()
  updateProduct()
  deleteProduct()
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
function deleteAllProduct() {
  document.getElementById("deleteAllProduct").addEventListener("click", function () {
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







// DA SISTEMARE FA SCHIFO
document.getElementById("productForm").addEventListener("input", function () {
  document.getElementById("updateProduct").style.display = "block"
  document.getElementById("deleteProduct").style.display = "block"
  document.getElementById("deleteAllProduct").style.display = "block"
})
