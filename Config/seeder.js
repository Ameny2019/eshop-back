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
                tel: '+216 55 786 851',
                email: 'ouelhazi.amani19@gmail.com',
                password: bcrypt.hashSync('123456789', 10),
                role: 'Admin',
                isActivated: true,
                avatar: 'http://res.cloudinary.com/dkkbwufyk/image/upload/v1669281121/Images/norc3tudwsnuloh4frov.png',
                verificationCode: randomBytes(6).toString("hex"),
            },
            {
                nom: 'Ouelhazi Wassim',
                adresse: 'Tunis',
                tel: '+216 58 306 330',
                email: 'ouelhaziw@gmail.com',
                password: bcrypt.hashSync('123456789', 10),
                role: 'Admin',
                isActivated: true,
                avatar: 'http://res.cloudinary.com/dkkbwufyk/image/upload/v1669281121/Images/norc3tudwsnuloh4frov.png',
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