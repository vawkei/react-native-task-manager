import "dotenv/config";
import express from "express";
import cors from "cors";
import ip from "ip";
import { dbCreate } from "./db/dbCreate";
import { notFound } from "./middlewares/notFoundMiddleware";
import { errorHandler } from "./middlewares/errorHandlerMiddleware";
import authRouter from "./routes/auth-route";
import taskRouter from "./routes/task-route";

// npm run dev

const app = express();
const authRoute = authRouter;
const taskRoute = taskRouter; 


app.use(express.json())

const corsOptions = {
  origin: ["http://localhost:8081"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["content-Type", "Authorization", "my-custom-header"],
};

app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("This is the react-native fullstack task-manager mobile app");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task",taskRoute);

// middlewares:
app.use(notFound);
app.use(errorHandler);

const serverPort = process.env.PORT || 5000;


const setupServer =async () => {
  
  // app.listen(serverPort,()=>{
  //   console.log(`server listening on port ${ip.address()}:${serverPort}`)
  // })

  try {
    await dbCreate();

    console.log("database created and connected...")
    
    app.listen(serverPort, () => {
      console.log(`server is listening on ${ip.address()}:${serverPort}`);
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("Failed to initialize database:", message);
  }
};

setupServer();
