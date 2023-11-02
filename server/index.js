import express from 'express';
import cors from 'cors';
import connectDB from './dbconfig/connectdb';

const app = express();

//connect db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//port 
const PORT = process.env.PORT || 8080;

//listen to port 
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
})