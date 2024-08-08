// server.ts

import express from 'express';
import bodyParser from 'body-parser';
import useRoutes from './routes/useRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/study-time', useRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});