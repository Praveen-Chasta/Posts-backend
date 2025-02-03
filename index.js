const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://quick-posts.vercel.app/']
}));


app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploadImages')));


mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database Connected ✅"))
.catch(err => console.error("❌ Error Connecting to Database:", err));


app.use('/', require('./router/postRoutes'));


app.listen(PORT, () => {
    console.log(`🚀 Server Running on PORT: ${PORT}`);
});
