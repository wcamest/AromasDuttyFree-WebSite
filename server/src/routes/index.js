const { Router } = require('express');

const inventoryRouter = require('./routers/inventory');
const promotionsRouter = require('./routers/promotions');
const shoppingCartRouter = require('./routers/shopping_cart');
const userRouter = require('./routers/users');

const router = Router();

router.use("/inventory", inventoryRouter);
router.use("/promotions", promotionsRouter);
router.use("/shopping_cart", shoppingCartRouter);
router.use("/user", userRouter);

module.exports = router;