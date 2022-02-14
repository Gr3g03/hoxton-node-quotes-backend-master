import express from "express";
import { quotes } from "./db";
import cors from 'cors';
import { request } from "express";

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




app.post('/quotes', (req, res) => {
    const firstName = req.body.firstName;
    const img = req.body.img;
    const lastName = req.body.lastName;
    const quote = req.body.quote;
    const author = req.body.author;
    const age = req.body.age;


    const errors = [];

    if (typeof firstName !== 'string') {
        errors.push('Name missing or wrong data format')
    }
    if (typeof lastName !== 'string') {
        errors.push('lastname missing or wrong data format')
    }
    if (typeof author !== 'string') {
        errors.push('author missing or wrong data format')
    }
    if (typeof img !== 'string') {
        errors.push('image missing or wrong data format')
    }
    if (typeof quote !== 'string') {
        errors.push('quote missing or wrong data format')
    }


    if (errors.length === 0) {
        // all good here
        const newQuote: Quotes = {
            id: Math.random(),
            firstName: firstName,
            img: img,
            lastName: lastName,
            quote: quote,
            author: author,
            age: age



        };

        // add dog to our dogs array
        // (like a memory db, this is forgotten when node restarts)
        quotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        // bad stuff happened
        res.status(400).send({ errors: errors });
    }
});


// pushing data to quotes
// app.post('quotes', (req, res) => {
//     const lastQuoteId = Math.max(...quotes.map((nQuote => nQuote.id)))
//     const newId = lastQuoteId + 1

//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const quote = req.body.quote;
//     const img = req.body.img;
//     const author = req.body.author;
//     const age = req.body.age;


//     const errors = [];

//     if (typeof firstName !== 'string') {
//         errors.push('Name missing or wrong data format')
//     }
//     if (typeof lastName !== 'string') {
//         errors.push('lastname missing or wrong data format')
//     }
//     if (typeof author !== 'string') {
//         errors.push('author missing or wrong data format')
//     }
//     if (typeof img !== 'string') {
//         errors.push('image missing or wrong data format')
//     }
//     if (typeof quote !== 'string') {
//         errors.push('quote missing or wrong data format')
//     }

//     if (typeof age !== 'string') {
//         errors.push('age missing or wrong data format')
//     }

//     if (errors.length === 0) {
//         const newQuote: Quotes = {
//             id: newId,
//             quote: quote,
//             author: author,
//             age: age,
//             firstName: firstName,
//             lastName: lastName,
//             img: img,
//         };

//         quotes.push(newQuote)
//         res.status(201).send(newQuote)
//     } else {
//         res.status(400).send({ errors: errors })
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})

