const { Router } = require("express");
const { getAllProducts, getProductById, addProductPicture, createProduct, updateProductData, deleteProductPicture, deleteProduct } = require("../controllers/inventory");

const inventoryRouter = Router();

inventoryRouter.get("/product/all", getAllProducts);
inventoryRouter.get("/product/:id", getProductById);
inventoryRouter.post("/product/picture/add", addProductPicture);
inventoryRouter.post("/product/create", createProduct);
inventoryRouter.put("/product/update", updateProductData);
inventoryRouter.delete("/product/picture/delete", deleteProductPicture);
inventoryRouter.delete("/product/delete", deleteProduct);

module.exports = inventoryRouter;