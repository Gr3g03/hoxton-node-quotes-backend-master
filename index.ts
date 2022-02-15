import express from "express";
import { quotes } from "./db";
import cors from 'cors';
import { Quotes } from "./db";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());



// filtering by author or display all quotes
app.get('/quotes', (req, res) => {
    const search = req.query.search;

    let match = quotes

    if (typeof search === 'string') {

        match = match.filter((quote) => quote.author.toUpperCase().includes(search.toUpperCase())
        );
    }

    res.send(match)
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



//  pushing new data to quotes
app.post('/quotes', (req, res) => {
    const quote = req.body.quote;
    const author = req.body.author;
    const age = req.body.age;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const img = req.body.img;


    const errors = [];

    // if (typeof firstName !== 'string') {
    //     errors.push('Name missing or wrong data format')
    // }
    // if (typeof lastName !== 'string') {
    //     errors.push('lastname missing or wrong data format')
    // }
    if (typeof author !== 'string') {
        errors.push('author missing or wrong data format')
    }
    // if (typeof img !== 'string') {
    //     errors.push('image missing or wrong data format')
    // }
    if (typeof quote !== 'string') {
        errors.push('quote missing or wrong data format')
    }


    if (errors.length === 0) {

        const newQuote: Quotes = {
            id: Math.random(),
            quote: quote,
            author: author,
            age: age,
            firstName: firstName,
            lastName: lastName,
            img: img
        };

        quotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(400).send({ errors: errors });
    }
});


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})

