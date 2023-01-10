import  express  from "express";
import  mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.js";
import videoRouter from "./routes/video.js";
import commentRouter from "./routes/comment.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"




const app = express();
dotenv.config()
const port = 8000
const connect = () =>{
    mongoose
        .connect(process.env.MONGO ,{
          useNewUrlParser: true,
        })
        .then(()=>{
            console.log("Connection database is successfully !!")
        })
        .catch(err => {throw err;});
}

app.use(
    express.urlencoded({
      extended: true,
    }),
  );


// app.use(
//     cors()
//   );

app.use(cors( 
  {
    credentials: true,
    // "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "optionsSuccessStatus": 204
    origin: 'https://youtube-client.onrender.com', // Cho phép gửi và nhận cookie từ client tại địa chỉ này
    
  }
))
Object.defineProperty(expressSession.Cookie.prototype, 'sameSite', {
  // sameSite cannot be set to `None` if cookie is not marked secure
  get() {
    return this._sameSite === 'none' && !this.secure ? 'lax' : this._sameSite;
  },
  set(value) {
    this._sameSite = value;
  }
});
app.use(cookieParser())
app.use(express.json());
app.use("/api",authRouter)
app.use("/api",userRouter)
app.use("/api",videoRouter)
app.use("/api",commentRouter)
app.use(expressSession({
  // ... other options
   cookie: {
     secure: 'auto',
     sameSite: 'none'
   }
 }));
app.use((err, req, res, next) => {
    const status = err.status   || 500
    const message = err.message || "some thing went wrong !"

    return res.status(status).json({
        success : false,
         status, message
    })
})


app.listen(port,()=>{
    connect();
    console.log(`Server is running at http://localhost:${port}` )
});