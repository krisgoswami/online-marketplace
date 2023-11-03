import express from 'express';
import cors from 'cors';
import connectDB from './dbconfig/connectdb.js';
import userRoute from './routes/userRoutes.js'

const app = express();

//connect db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/user', userRoute);

//port 
const PORT = process.env.PORT || 8080;

//listen to port 
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
})