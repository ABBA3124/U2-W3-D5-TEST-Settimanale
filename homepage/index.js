document.addEventListener("DOMContentLoaded", function () {
    const loadingIndicator = document.getElementById('loadingIndicator')
    loadingIndicator.style.display = 'inline' 
    fetchProducts()
  })
  const Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjE0ODdmMzA0NjAwMWFlNTlmODkiLCJpYXQiOjE3MTI5MTA2NjQsImV4cCI6MTcxNDEyMDI2NH0.MF6gjc_Xgs3WqtBr41OBMTXHl7e8XYn7Zf8jq2Zkd9E"
  const fetchUrl = "https://striveschool-api.herokuapp.com/api/product/"

  function fetchProducts() {
    fetch(fetchUrl, {
      method: "GET",
      headers: { Authorization: Token}
    })
      .then((response) => response.json())
      .then((data) => {
          // start ritardo per far vedere il caricamento
        setTimeout(() => { 
          displayProducts(data)
          document.getElementById('loadingIndicator').style.display = 'none'  
          document.getElementById('mainContent').style.display = 'block'
        }, 1000)  // ritardo fatto volutamente per far vedere il caricamento
      })
      .catch((error) => {
        console.error("errore nel caricamento fetch ", error)
        document.getElementById('loadingIndicator').style.display = 'none'  
        document.getElementById('mainContent').style.display = 'block'
      })
  }
  
  function displayProducts(products) {
    const container = document.getElementById("product-container")
    container.innerHTML = ""
  
    products.forEach((product) => {
      const card = document.createElement("div")
      card.className = "card d-flex flex-column m-3"
      card.style.width = "18rem"
      card.innerHTML = `
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="d-flex flex-column justify-content-between">  
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <div class="text-muted d-flex justify-content-between align-items-center mt-2">
                <small><span class="fw-bold">Brand:</span> ${product.brand}</small>
                <small>${product.price}€</small>
            </div>
        </div>
        <div class="btn-group mt-auto p-3 w-100" role="group">  
            <a href="../detail/detail.html?productId=${product._id}" class="btn btn-primary w-100 w-sm-50">Scopri di più</a>
            <a href="../backoffice/backoffice.html?productId=${product._id}" class="btn btn-secondary w-100 w-sm-50">Modifica</a>
        </div>
        `
      container.appendChild(card)
    })
  }


  