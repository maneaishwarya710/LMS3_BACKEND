import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import tutorRouter from "./routes/tutor.routes";
import studentRouter from "./routes/student.routes";
import quizRouter from "./routes/quiz.routes";
import courseRouter from "./routes/course.routes";

const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",       //or '*' 
    credentials:true,
    allowedHeaders: "*"
}))
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/tutor', tutorRouter);
app.use('/student', studentRouter);
app.use('/quiz', quizRouter);
app.use('/course', courseRouter);

const PORT=3004;
AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
