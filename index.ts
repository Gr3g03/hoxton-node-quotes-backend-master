import express from "express";

const app = express();
const PORT = 4000;



type Quotes = {
    id: number;
    quote: string;
    author: string;
}


const quotes: Quotes[] = [
    {
        id: 1,
        quote: 'Many of lifes failures are people who did not realize how close they were to success when they gave up',
        author: 'Thomas A. Edison',
    },
    {
        id: 2,
        quote: 'Make memes, not war!',
        author: 'Mark Twain',
    },
    {
        id: 3,
        quote: 'Stop making quotes I never said!',
        author: 'Albert Einstein',
    },
    {
        id: 4,
        quote: 'The purpose of our lives is to be happy.',
        author: 'Dalai Lama',
    },
    {
        id: 5,
        quote: 'Life is what happens when youre busy making other plans.',
        author: 'John Lennon'
    },
    {
        id: 6,
        quote: 'Get busy living or get busy dying.',
        author: 'Stephen King'
    },
    {
        id: 7,
        quote: 'You only live once, but if you do it right, once is enough.',
        author: 'Mae West'
    },
    {
        id: 8,
        quote: 'Never let the fear of striking out keep you from playing the game',
        author: 'Babe Ruth'
    }


];

const cors = require('cors');
app.use(cors({
    origin: '*'
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

