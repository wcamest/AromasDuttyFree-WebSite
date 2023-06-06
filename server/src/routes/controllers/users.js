const bcrypt = require("bcryptjs");
const { generateId } = require("../utils/utils");
const { User, UserPassword, ShippingAddress } = require("../../database");

const getAllUsers = async (req, res) => {
    try {
        const { offset } = req.params;
        const limit = 30;

        const users = await User.findAll({
            offset,
            limit
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos de usuario' });
    }
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, userLevel, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Ya existe una cuenta registrada con este correo' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = generateId();
        const passwordId = generateId();

        const newUserData = await User.create({
            id: userId,
            firstName,
            lastName,
            profilePicturePath: null,
            phone,
            userLevel,
            email
        });

        await newUserData.createPassword({
            id: passwordId,
            current: true,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario creado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

const updateUserData = async (req, res) => {
    try {
        const { id, name, lastName, phone, userLevel, email } = req.body;
        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        userData.name = name;
        userData.lastName = lastName;
        userData.phone = phone;
        userData.userLevel = userLevel;
        userData.email = email;

        await userData.save();

        res.status(200).json({ message: "Datos de usuario actualizados exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar los datos del usuario' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await userData.destroy();
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const { id, currentPassword, newPassword } = req.body;
        const userData = await User.findByPk(id, {
            include: {
                model: UserPassword,
                as: 'passwords'
            }
        });

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const currentPasswordData = userData.passwords.find((passwordData) => {
            return passwordData.current
        });

        const isPasswordValid = await bcrypt.compare(currentPassword, currentPasswordData.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'La contraseña actual no es válida' });
        }

        const newPasswordExists = userData.passwords.some((passwordData) => bcrypt.compareSync(newPassword, passwordData.password));

        if (newPasswordExists) {
            return res.status(400).json({ message: 'La nueva contraseña ya ha sido utilizada anteriormente' });
        }

        currentPasswordData.current = false;
        currentPasswordData.save();

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const passwordId = generateId();

        await userData.createPassword({
            id: passwordId,
            current: true,
            password: hashedNewPassword
        });

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
}

const recoverPassword = (req, res) => {
    try {

    } catch (error) {

    }
}

const updateProfilePicture = async (req, res) => {
    try {
        const { id } = req.body;
        const { profilePicture } = req.files;

        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (userData.profilePicturePath) {
            const imagePath = path.join(__dirname, '..', 'images', 'profile_pictures', userData.profilePicturePath);
            fs.unlinkSync(imagePath);
        }

        const uniqueFilename = `${generateId()}${path.extname(profilePicture.name)}`;

        const imageSavePath = path.join(__dirname, '..', 'images', 'profile_pictures', uniqueFilename);
        await profilePicture.mv(imageSavePath);

        userData.profilePicturePath = uniqueFilename;
        await userData.save();

        res.status(200).json({ message: 'Imagen de perfil actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
    }
}

const deleteProfilePicture = async (req, res) => {
    try {
        const userData = await User.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (userData.profilePicturePath) {
            const imagePath = path.join(__dirname, '..', 'images', 'profile_pictures', userData.profilePicturePath);
            fs.unlinkSync(imagePath);
            userData.profilePicturePath = null;
            await userData.save();

            return res.status(200).json({ message: 'Imagen de perfil eliminada exitosamente' });
        } else {
            return res.status(404).json({ message: 'El usuario no tiene una imagen de perfil' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
    }
}

const addShippingAddress = async (req, res) => {
    try {
        const { id, userIDNumber, department, city, phone, address } = req.body;
        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const shippingAddressId = generateId();
        userData.createShippingAddress({
            id: shippingAddressId,
            userIDNumber,
            department,
            city,
            phone,
            address
        });

        res.status(201).json({ message: 'Dirección agregada exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la direccíon' });
    }
}

const updateShippingAddress = async (req, res) => {
    try {
        const { id, userIDNumber, department, city, phone, address } = req.body;
        const shippingAddress = await ShippingAddress.findByPk(id, {include: User});

        if(!shippingAddress){
            return res.status(404).json({error: 'La dirección no existe'});
        }

        shippingAddress.userIDNumber = userIDNumber;
        shippingAddress.department = department;
        shippingAddress.city = city;
        shippingAddress.phone = phone;
        shippingAddress.address = address;

        await shippingAddress.save();

        res.json({ message: "Dirección actualizada exitosamente" });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la dirección' });
    }
}

const deleteShippingAddress = async (req, res) => {
    try {
        const { id } = req.body;
        const shippingAddress = await ShippingAddress.findByPk(id, { include: User });

        if (!shippingAddress) {
            return res.status(404).json({ error: 'La dirección no existe' });
        }
        await shippingAddress.destroy();

        res.json({ message: 'La dirección se eliminó exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar dirección' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserData,
    updateUserPassword,
    recoverPassword,
    deleteUser,
    updateProfilePicture,
    deleteProfilePicture,
    addShippingAddress,
    updateShippingAddress,
    deleteShippingAddress
}