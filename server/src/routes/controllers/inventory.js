const { generateId } = require("../utils/utils");
const { Product, ProductPicture } = require("../../database");

const getAllProducts = async (req, res) => {
    try {
        const { offset } = req.params;
        const limit = 30;

        const products = await Product.findAll({
            offset,
            limit
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await Product.findByPk(id);

        if (!productData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(productData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos de producto' });
    }
}

const addProductPicture = async (req, res) => {
    try {
        const { id, pictureName } = req.body;
        const { ProductPicture } = req.files;

        const productData = await Product.findByPk(id);

        if (!productData) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const uniqueFilename = `${pictureName}${path.extname(ProductPicture.name)}`;
        const imageSavePath = path.join(__dirname, '..', 'images', 'products', uniqueFilename);
        await ProductPicture.mv(imageSavePath);

        const productPictureId = generateId();

        productData.createProductPicture({
            id: productPictureId,
            path: uniqueFilename
        });

        res.status(201).json({ message: 'Imagen agregada exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al añadir imagenes al producto' });
    }
}

const createProduct = async (req, res) => {
    try {
        const { productReferenceId, name, description, category, filters, score, salePrice } = req.body;
        const productId = generateId();

        await Product.create({
            id: productId,
            productReferenceId,
            name,
            description,
            category,
            filters,
            score,
            salePrice,
        });

        res.status(201).json({ message: 'Producto creado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

const updateProductData = async (req, res) => {
    try {
        const { id, name, description, category, filters, score, salePrice } = req.body;

        const productData = await Product.findByPk(id);

        if (!productData) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        productData.name = name;
        productData.description = description;
        productData.category = category;
        productData.filters = filters;
        productData.score = score;
        productData.salePrice = salePrice;

        await productData.save();

        res.json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}

const deleteProductPicture = async (req, res) => {
    try {
        const { id } = req.body;
        const picture = await ProductPicture.findByPk(id, { include: Product });

        if (!picture) {
            return res.status(404).json({ error: 'La imagen no existe' });
        }

        const imagePath = path.join(__dirname, '..', 'images', 'products', picture.path);
        fs.unlinkSync(imagePath);

        await picture.destroy();

        res.json({ message: 'La imagen se eliminó exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar imagenes del producto' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const productData = await Product.findByPk(id);

        if (!productData) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await productData.destroy();

        res.status(204).end();
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).json({ error: 'Error al borrar el producto' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProductPicture,
    createProduct,
    updateProductData,
    deleteProductPicture,
    deleteProduct
}