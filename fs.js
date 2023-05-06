const fs = require("fs");

const createFile = async () => {
  if (!fs.existsSync("products.json")) {
    return await fs.promises.writeFile("products.json", "[]");
  }
};

createFile();

class ProductManager {
  constructor() {
    this.path = "products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);
    this.products = products;

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError) {
      console.log("Error code, existing code");
    } else {
      this.id++;
      title = title || "no value entered";
      description = description || "no value entered";
      price = price || "no value entered";
      thumbnail = thumbnail || "no value entered";
      code = code || "no value entered";
      stock = stock || "no value entered";

      if (
        title == "no value enteredr" ||
        description == "no value entered" ||
        price == "no value entered" ||
        thumbnail == "no value entered" ||
        code == "no value entered" ||
        stock == "no value enteredr"
      ) {
        console.log("Error: there are unfilled fields");
      } else {
        const product = {
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productsString);
      }
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    console.log(fileProductsParse);
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("product not found");
    }
  }

  async updateProduct(id, prop, newValor) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      console.log("product not found");
    } else {
      findProd[prop] = newValor;
      const productsString = JSON.stringify(fileProductsParse);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("product not found");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
}

const prodManager = new ProductManager();

async function algo() {
  await prodManager.addProduct(
    "test product",
    "this is a test product",
    200,
    "no image",
    "abc123",
    25
  );

  await prodManager.addProduct(
    "test product 2",
    "this is a test product 2",
    200,
    "no image ",
    "abc124",
    25
  );

  await prodManager.addProduct(
    "test product 3",
    "this is a test product 3",
    200,
    "no image",
    "abc125",
    25
  );
  console.log("whole products");
  await prodManager.getProducts();

  console.log("we looking for a product for the ID");
  await prodManager.getProductById(2);

  console.log(
    "a field of the product searched is update by if ID, the title in this case"
  );
  await prodManager.updateProduct(2, "title", "new title");

  await prodManager.getProductById(2);

  console.log("delete a product by its ID in this case with ID 3 ");
  
  await prodManager.deleteProduct(3);

  await prodManager.getProducts();
}

algo();