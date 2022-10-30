const User = require('../Models/user');
const { success } = require("consola");

(async () => {
    success({
        message: `Start of the seeder script.`,
    });
    const userCount = await User.countDocuments();
    if (userCount == 0) {
        // inserts the admins accounts
        const usersToInsert = [
            {

            },
            {

            }
        ];
        // hash the passwords

        // save in the database
        await User.insertMany(usersToInsert);
    }
    success({
        message: `End of the seeder script.`,
    });
})()