document.addEventListener("DOMContentLoaded", function () {
  caricaDatiQuandoAccadeScopriDiPiù()
})


const Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E"
const fetchUrl = "https://striveschool-api.herokuapp.com/api/product/"




function caricaDatiQuandoAccadeScopriDiPiù() {
  const params = new URLSearchParams(window.location.search)
  const productId = params.get("productId")
  if (productId) {
    searchProduct(productId)
  } else {
    console.error("Id non corretto o inesistente.")
    alert("Id non corretto o inesistente.")
  }
}

function searchProduct(productId) {
  fetch(`${fetchUrl}${productId}`, {
    method: "GET",
    headers: {Authorization: Token},
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fetch error, verifica che il percorso sia corretto")
      }
      return response.json()
    })
    .then((product) => {
      document.getElementById("productName").textContent = product.name
      document.getElementById("productDescription").textContent = product.description
      document.getElementById("productBrand").textContent = product.brand
      document.getElementById("productPrice").textContent = `Price: ${product.price}€`
      document.getElementById("productImage").src = product.imageUrl
      document.getElementById("productImage").alt = product.name
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("Impossibile caricare info prodotto, controlla la console.")
    })
}
