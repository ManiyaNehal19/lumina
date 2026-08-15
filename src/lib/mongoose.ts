// import mongoose from "mongoose";
// const connectionToDataBase = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_DB_URL as string);
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }
// export default connectionToDataBase;

import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectionToDataBase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGO_DB_URL as string);
};

export default connectionToDataBase;