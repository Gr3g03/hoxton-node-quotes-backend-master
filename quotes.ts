import { Router } from "express";
import { authors } from "./authors";

export type Quotes = {
    id: number;
    quote: string;
    authorId: number;
}


const router = Router()


export let quotes: Quotes[] = [
    {
        id: Math.random(),
        quote: 'Many of lifes failures are people who did not realize how close they were to success when they gave up',
        authorId: authors[0].id
    },
    {
        id: Math.random(),
        quote: 'Make memes, not war!',
        authorId: authors[1].id

    },
    {
        id: Math.random(),
        quote: 'Stop making quotes I never said!',
        authorId: authors[2].id

    },
    {
        id: Math.random(),
        quote: 'The purpose of our lives is to be happy.',
        authorId: authors[3].id

    },
    {
        id: Math.random(),
        quote: 'Life is what happens when youre busy making other plans.',
        authorId: authors[4].id

    },

    {
        id: Math.random(),
        quote: 'Get busy living or get busy dying.',
        authorId: authors[5].id


    },
    {
        id: Math.random(),
        quote: 'You only live once, but if you do it right, once is enough.',
        authorId: authors[6].id


    },
    {
        id: Math.random(),
        quote: 'Never let the fear of striking out keep you from playing the game',
        authorId: authors[7].id


    },

];



router.get('/', (req, res) => {
    let copyQuotes = JSON.parse(JSON.stringify(quotes))

    for (const quote of copyQuotes) {
        const author = authors.find(author => author.id === quote.authorId)
        quote.author = author
    }
    res.send(copyQuotes)
})


// filtering by ID Number
router.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});



//  pushing new data to quotes
router.post('/', (req, res) => {

    const errors = [];

    if (typeof req.body.authorId !== 'number') {
        errors.push('authorId missing or wrong data format')
    }

    if (typeof req.body.quote !== 'string') {
        errors.push('quote missing or wrong data format')
    }

    if (errors.length === 0) {
        const quote: Quotes = {
            id: Math.random(),
            quote: req.body.quote,
            authorId: req.body.authorId
        }

        quotes = [...quotes, quote]

        res.send(quote)
    } else {
        res.status(400).send({ errors: errors });
    }
});


// patch 

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { quote, authorId } = req.body
    // data that we will update

    const quoteToChange = quotes.find((qte) => qte.id === id);

    //check if the property exist or not 

    if (quoteToChange) {
        if (typeof quote === 'string') quoteToChange.quote = quote
        if (typeof authorId === 'string') quoteToChange.quote = quote
        res.send(quoteToChange)
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = quotes.find(qte => qte.id === id)


    if (match) {

        quotes = quotes.filter(qte => qte.id !== id)
        res.send("quote deletet successfully")
    } else {
        res.status(404).send({ error: ' quote not found' })
    }
})



export default router