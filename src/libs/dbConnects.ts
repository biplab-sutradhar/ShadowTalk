import mongoose from "mongoose";

type ConnectionObject = {
    isConnected : number;
};

const connection : ConnectionObject = { 
    isConnected : 0,
}

async function dbConnect():Promise<void> {
    if(connection.isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
      const db =  await mongoose.connect(process.env.MONGODB_URI as string || '');
      connection.isConnected = db.connections[0].readyState;
      console.log("MongoDB connected");
    } catch (error) {
        
        console.log("MongoDB connection failed"  ,error);
        process.exit(1);
        
    }
}
export default dbConnect;