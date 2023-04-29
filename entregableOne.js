
// I created the class qith the contructor to start the code//

class ProductManager {
  constructor() {
    this.products = [];
  }
  // I Created the method "ADDPRODUCTS" to return all the product created since the mdment //
  getProducts() {
    console.log(this.products);
    return this.products;
  }
  // Here I defined the method in the class to accepted a ID parameter to find a product 
  //If the product id finded, true if doesn´t return NOT FOUND 
  getProductById(id) {
    const found = this.products.find(p => p.id == id);
    if (found) {
      return found
    } else
    console.log("Not found");
    return undefined
  }

  // below I used this method to avoid that the product will repeat in the array this.products

  #getProductByCode(code) {
    const currentArray= this.products.some(p => p.code == code);
    if(currentArray){
      return true;
    }else {
      console.log("error cannor be repeat")
    }
    

  }

  // to generated a unic ID for each product, Used a For  

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
  // here the code is to add a new product to the list , if the product is valid and there is no 
  // a repetition for it 
  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      (title === undefined || title === null || title === "") || (description === undefined ||description === null || description === "") ||
      (price === undefined || price === null || price === "") ||(thumbnail === undefined || thumbnail === null || thumbnail === "") ||
      (code === undefined  || code === null  ||  code === "" || (stock === undefined || stock === null || stock === "")) || this.#getProductByCode(code)) 
       { console.log("Error, the code cannot be repeated ");} 
       else {
      let newProduct = { title,description, price,thumbnail,code,stock,
        id: this.#generatedId(),};
      this.products = [...this.products, newProduct];
    }
  }
}



const productManager = new ProductManager()

productManager.addProduct("compu1", "very fast", "200000", "node", "2", 5)
productManager.addProduct("cel1", "very fast", "200000", "node", "2", 5)
productManager.addProduct("tablet1", "very fast", "200000", "node", "4", 5)


productManager.getProducts()

productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);