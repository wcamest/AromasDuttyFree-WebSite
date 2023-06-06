const { Router } = require("express");

const promotionsRouter = Router();

promotionsRouter.get("/promotions/all"/*, createOrder*/);
promotionsRouter.get("/promotion/:promotion_id"/*, getUserById*/);
promotionsRouter.post("/promotion/create"/*, createUser*/);
promotionsRouter.put("/promotion/update"/*, createUser*/);
promotionsRouter.delete("/promotion/delete"/*, createUser*/);

module.exports = promotionsRouter;