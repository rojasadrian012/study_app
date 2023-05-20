const {sequelize} = require ("../connection");
const jwt = require ('jsonwebtoken');

const auth = async function (req, res, next) {
    if (!req.headers.authorization) {
        res.json({
            success: false,
            error: "No autorizado el header"
        });
    } else {
        // Suponemos que estás usando el esquema Bearer para los tokens de autenticación.
        let token = req.headers.authorization.split(' ')[1]; // Esto despojará el prefijo 'Bearer '.
        const usersDB = await sequelize.query("SELECT * FROM users WHERE token = '" + token +"'");
        let user = null;

        if (usersDB.length > 0 && usersDB[0].length > 0){
            user = usersDB[0][0];
            console.log("Token de usuario", user);

            res.locals.userId = user.id;
            next();
        } else {
            res.json({
                success: false,
                error: "Token invalido"
            });
        }
    }
}

module.exports = {
    auth
};