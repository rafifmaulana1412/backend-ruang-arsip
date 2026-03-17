const repository = require('./auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (payload) => {


    const user = await repository.findByUsername(payload.username);
    if (!user) throw new Error("Invalid username or password")

    const match = await bcrypt.compare(payload.password, user.password)
    if (!match) throw new Error('Invalid username or password')

    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { data: user, token }
}