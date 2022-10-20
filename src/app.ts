import express, {Express, Request, Response} from 'express';
import  {carParkRouter, userRouter, logRouter, expenditureRouter, trafficImageRouter}  from "./routers";
import bodyParser from 'body-parser';


const app: Express = express();

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.json())
app.use(carParkRouter);
app.use(userRouter);
app.use(logRouter);
app.use(expenditureRouter);
app.use(trafficImageRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});




export default app;