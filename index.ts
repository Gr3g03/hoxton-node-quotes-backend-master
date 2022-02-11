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


// filtering by ID Number
app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});


// filtering by author
app.get('/quotes/:authorId', (req, res) => {
    const authorId = Number(req.params.authorId);
    const match = quotes.find((quote) => quote.id === authorId);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'author not found.' });
    }
});




// pushing data to quotes
app.post('quotes', (req, res) => {
    const incomingQuotes = req.body

    quotes.push(incomingQuotes)
    res.json(quotes)
})


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})

