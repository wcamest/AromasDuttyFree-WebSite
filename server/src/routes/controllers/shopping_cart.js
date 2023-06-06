const { generateId } = require("../utils/utils");
const { Order, ProductOrderingItem, Product, User } = require("../../database");

const getAllOrders = async (req, res) => {
    try {
        const { offset } = req.params;
        const limit = 30;

        const orders = await Order.findAll({
            offset,
            limit
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderData = await Order.findByPk(id);

        if (!orderData) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json(orderData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el pedido' });
    }
}

const createOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await User.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const orderId = generateId();
        const orderReference = generateId();

        await userData.createOrder({
            id: orderId,
            reference: orderReference,
            status: 'ACTIVE_IN_SHOPPING_CART'
        });

        res.status(200).json({ message: 'Pedido creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
}

const addProductOrderingItem = async (req, res) => {
    try {
        const { orderId, productId } = req.body;

        const orderData = await Order.findByPk(orderId);
        const productData = await Product.findByPk(productId);

        if (!orderData) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        if (!productData) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (orderData.status !== 'ACTIVE_IN_SHOPPING_CART') {
            return res.status(403).json({ message: 'Este pedido ya no se puede modificar' });
        }

        const productOrderingItemId = generateId();

        const productOrderingItemData = await orderData.createProductItem({
            id: productOrderingItemId,
            count: 1
        });

        await productData.addProductOrderingItem(productOrderingItemData);

        res.status(200).json({ message: 'Item agregado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al añadir item al pedido' });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { id } = req.body;

        const orderData = await Order.findByPk(id);

        if (!orderData) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        orderData.status = "CANCELED";
        await orderData.save();

        res.status(200).json({ message: 'Pedido cancelado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cancelar el pedido' });
    }
}

const updateProductOrderingItem = async (req, res) => {
    try {
        const { id, count } = req.body;
        const productOrderingItemData = await ProductOrderingItem.findByPk(id);

        if (!productOrderingItemData) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }

        productOrderingItemData.count = count;
        await productOrderingItemData.save();

        res.status(200).json({ message: 'Item actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar item dentro del pedido' });
    }
}

const clearOrder = async (req, res) => {
    try {
        const { id } = req.body;

        await ProductOrderingItem.destroy({
            where: {
                orderId: id
            }
        });

        res.status(200).json({ message: 'Pedido vaciado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al vaciar el pedido' });
    }
}

const deleteProductOrderingItem = async (req, res) => {
    try {
        const { id } = req.body;

        const productOrderingItemData = await ProductOrderingItem.findByPk(id, {
            include: [
                { model: Order },
                { model: Product }
            ]
        });

        if (!productOrderingItemData) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }

        if(productOrderingItemData.order.status !== 'ACTIVE_IN_SHOPPING_CART'){
            return res.status(403).json({ message: 'Este pedido ya no se puede modificar' });
        }

        await productOrderingItemData.destroy();

        res.status(200).json({ message: 'Item eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto del pedido' });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    addProductOrderingItem,
    cancelOrder,
    updateProductOrderingItem,
    clearOrder,
    deleteProductOrderingItem
}