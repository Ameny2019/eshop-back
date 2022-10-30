const User = require('../Models/user');
const { success } = require("consola");
const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");

(async () => {
    success({
        message: `Start of the seeder script.`,
    });
    const userCount = await User.countDocuments();
    if (userCount == 0) {
        // inserts the admins accounts
        const usersToInsert = [
            {
                nom: '',
                adresse: '',
                tel: '',
                email: '',
                password: bcrypt.hashSync('12356789', 10),
                role: 'Admin',
                isActivated: true,
                verificationCode: randomBytes(6).toString("hex"),
            },
            {
                nom: '',
                adresse: '',
                tel: '',
                email: '',
                password: bcrypt.hashSync('12356789', 10),
                role: 'Admin',
                isActivated: true,
                verificationCode: randomBytes(6).toString("hex"),
            }
        ];
        // save in the database
        await User.insertMany(usersToInsert);
    }
    success({
        message: `End of the seeder script.`,
    });
})()