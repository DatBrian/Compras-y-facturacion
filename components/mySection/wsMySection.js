const urlEndPoint = "http://localhost:3000";

/* Method get (Get users) */
const getProducts = async (product) => {
    try {
        const response = await fetch(`${urlEndPoint}/products`, {
            method: 'GET',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const products = await response.json()
        createCards(products);
        return products;
    }
    catch (err) {
        console.log(err);
    }
}


const createCards = async (products) => {
    try {
        products.forEach(product => {
            let plantilla = `
                <div class= "card">
                    <div class="title">
                        <h3>${product.name}</h3>
                    </div>
                    <div class="image"></div>
                    <div class="info">
                        <h4>Price: ${product.price}</h4>
                        <h4>Description: ${product.description}</h4>
                    </div>
                    <div class="buttons">
                        <button>
                            <img src="resources/images/anadir-a-la-cesta.png" alt="">
                        </button>
                        <button>
                            <img src="resources/images/latido-del-corazon.png">
                        </button>
                    </div>
                </div>
            `
            self.postMessage({ message: "plantilla", data: plantilla });
        });
    } catch (error) {
        console.error(error);
    }
}

self.addEventListener("message", (e) => {
    let { message } = e.data;
    if (message === "api") {
        getProducts();
    }
})