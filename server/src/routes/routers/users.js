const { Router } = require("express");
const { createUser, updateUserData, updateUserPassword, deleteUser, getAllUsers, getUserById, updateProfilePicture, addShippingAddress, updateShippingAddress, deleteShippingAddress } = require("../controllers/users");

const usersRouter = Router();

usersRouter.get("/all_users/:offset", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/create", createUser);
usersRouter.post("/shipping_address/add", addShippingAddress);
usersRouter.put("/update", updateUserData);
usersRouter.put("/shipping_address/update", updateShippingAddress);
usersRouter.put("/profile_picture/update", updateProfilePicture);
usersRouter.put("/password/update", updateUserPassword);
usersRouter.put("/password/recover"/*, recoverPassword*/);
usersRouter.delete("/delete", deleteUser);
usersRouter.delete("/shipping_address/delete", deleteShippingAddress);

module.exports = usersRouter;