class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      console.log(this.products);
      return this.products;
    }
  
    getProductById(id) {
      const found = this.products.find(p => p.id == id);
      if (!found) {
        console.log("Error, product not found");
      }
      return found;
    }
  
    #getProductByCode(code) {
      return this.products.find(p => p.code == code);
    }
  
    #generatedId() {
      let maxId = 0;
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i];
        if (product.id > maxId) {
          maxId = product.id;
        }
      }
      return ++maxId;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (
        (title === undefined ||
          title === null ||
          title === "") ||
        (description === undefined ||
          description === null ||
          description === "") ||
        (price === undefined || price === null || price === "") ||
        (thumbnail === undefined || thumbnail === null || thumbnail === "") ||
        (code === undefined ||
          code === null ||
          code === "" ||
          this.#getProductByCode(code)) ||
        (stock === undefined || stock === null || stock === "")
      ) {
        console.log("Error, the code cannot be repeated or empty");
      } else {
        let newProduct = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.#generatedId(),
        };
        this.products = [...this.products, newProduct];
      }
    }
  }
  
  const myP = new ProductManager();
  
  myP.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "none",
    "abc123",
    25
  );
  
  myP.addProduct(
    "Producto 2",
    "Descripción del producto 2",
    20,
    "none",
    "P2",
    50
  );
  
  console.log(myP.getProducts());
  
  console.log(myP.getProductById(1));
  console.log(myP.getProductById(3));
  