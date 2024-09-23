const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const { nama, email, password, tanggalLahir, jenisKelamin, beratBadan, tinggiBadan } = req.body;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.users.create({
        data: {
            nama: nama,
            email: email,
            password: hashedPassword,
            tanggalLahir: new Date(tanggalLahir),
            jenisKelamin: jenisKelamin,
            beratBadan: beratBadan,
            tinggiBadan: tinggiBadan,
        },
    });

    res.status(201).json(newUser);
};

module.exports = {
    registerUser,
};