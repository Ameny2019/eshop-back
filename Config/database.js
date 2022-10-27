const {connect} = require('mongoose');
const {success} = require("consola");

(async () =>{
    try {
        await connect(process.env.MONGO_URL);
        success({
            message:`Success to connect to database.`,
        })
    } catch (error) {
           console.log(error);
    }
})();
