const express=require('express');
const app=express();
const port=4004;
const cors=require('cors');
const connectDB = require('./db');
const {apiRouter} = require('./routes/index');
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });

app.use(cors());

app.use(express.json());

app.use('/api',apiRouter);

connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
