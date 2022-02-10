import express from "express";
import { quotes } from "./db";
import cors from 'cors';

const app = express();
const PORT = 4000;


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/quotes', (req, res) => {
    res.send(quotes)
});


app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});



app.get('/quotes/:author', (req, res) => {
    const author = Number(req.params.author);
    const match = quotes.find((quote) => quote.id === author);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'author not found.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})

