const { Router } = require("express");
const { getAllOrders, getOrderById, createOrder, addProductOrderingItem, cancelOrder, updateProductOrderingItem, clearOrder, deleteProductOrderingItem } = require("../controllers/shopping_cart");

const shoppingCartRouter = Router();

shoppingCartRouter.get("/order/all", getAllOrders);
shoppingCartRouter.get("/order/:id", getOrderById);
shoppingCartRouter.post("/order/create", createOrder);
shoppingCartRouter.post("/order/items/add", addProductOrderingItem);
shoppingCartRouter.put("/order/cancel", cancelOrder);
shoppingCartRouter.put("/order/items/update", updateProductOrderingItem);
shoppingCartRouter.delete("/order/clear", clearOrder);
shoppingCartRouter.delete("/order/items/delete", deleteProductOrderingItem);

module.exports = shoppingCartRouter;