import express from 'express';
const app = express();
import { apiRouter } from './routers/apiRouter';
import { errHandleCustom, errHandleInvalidEnpoint, errHandle400 } from './errHandle';
import cors from 'cors';


app.use(express.json());
app.use(cors);


app.use('/api', apiRouter);

app.use('/*', errHandleInvalidEnpoint);
app.use(errHandle400);
app.use(errHandleCustom);



export default app;
