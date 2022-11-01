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
                nom: 'Ouelhazi Ameny',
                adresse: 'Tunis',
                tel: '+216 58 55 22 33',
                email: 'ouelhazi.amani19@gmail.com',
                password: bcrypt.hashSync('123456789', 10),
                role: 'Admin',
                isActivated: true,
                avatar: `${process.env.BACKEND_URL}1667120445740.jpg`,
                verificationCode: randomBytes(6).toString("hex"),
            },
            {
                nom: 'Dagbouj Hatem',
                adresse: 'Tunis',
                tel: '+216 58 55 22 33',
                email: 'dagboujhatem@gmail.com',
                password: bcrypt.hashSync('123456789', 10),
                role: 'Admin',
                isActivated: true,
                avatar: `${process.env.BACKEND_URL}1667120445740.jpg`,
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