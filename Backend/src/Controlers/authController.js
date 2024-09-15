const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('./userController'); 

const JWT_SECRET = 'tu_clave_secreta';

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado.' });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
        }


        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });


        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
};

module.exports = { login };
