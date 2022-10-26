import express, {Express, Request, Response} from 'express';
import  {carParkRouter, userRouter, logRouter, expenditureRouter, trafficImageRouter}  from "./routers";
import bodyParser from 'body-parser';
import { getAPIKey } from './util/map/map';


const app: Express = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
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