import express from 'express';
import cors from 'cors';

import quoteRouter from './quotes';
import authorRouter from './authors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/quotes', quoteRouter);
app.use('/authors', authorRouter);

app.listen(4000, () => {
    console.log(`Server up on: http://localhost:4000`);
});
