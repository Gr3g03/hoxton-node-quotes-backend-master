import express from "express";
// import { quotes } from "./db";
import cors from 'cors';
import { Quotes } from "./quotes";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());


export type author = {
    id: number;
    author: string;
    age: number;
    firstName: string;
    lastName: string;
    img: string;
}



let authors: author[] = [
    {
        id: Math.random(),
        author: 'Thomas  Edison',
        age: 50,
        firstName: 'Thomas',
        lastName: 'Edison',
        img: 'https://compote.slate.com/images/3a53f815-fac0-4a76-9f80-f513178caffc.jpg%22',
    },
    {
        id: Math.random(),
        author: 'Mark',
        age: 50,
        firstName: 'Mark',
        lastName: 'Mark',
        img: 'https://www.theparisreview.org/blog/wp-content/uploads/2017/11/audiobook-mark-twain-01-lamano-studio-photography-animation-cgi-character-design-craft-illustration-post-production-1-e1510775155945.jpg',

    },
    {
        id: Math.random(),
        author: 'Albert Einstein',
        age: 50,
        firstName: 'Albert',
        lastName: 'Einstein',
        img: 'https://parade.com/wp-content/uploads/2021/08/albert-einstein-quotes.jpg',
    },
    {
        id: Math.random(),
        author: 'Dalai Lama',
        age: 50,
        firstName: 'Dalai',
        lastName: 'Lama',
        img: 'https://images-cdn.9gag.com/photo/10706_700b.jpg',
    },
    {
        id: Math.random(),
        author: 'John Lennon',
        age: 50,
        firstName: 'John',
        lastName: 'Lennon',
        img: 'https://www.thatericalper.com/wp-content/uploads/2015/03/John-Lennons-Funny-Faces-1966-1.jpg',
    },
    {
        id: Math.random(),
        author: 'Stephen King',
        age: 50,
        firstName: 'Stephen',
        lastName: 'King',
        img: 'https://imgix.ranker.com/list_img_v2/65/2860065/original/2860065',
    },
    {
        id: Math.random(),
        author: 'Mae West',
        age: 50,
        firstName: 'Mae',
        lastName: 'West',
        img: 'https://lwlies.com/wp-content/uploads/2019/08/mae-west-sex.jpg',
    },
    {
        id: Math.random(),
        author: 'Babe Ruth',
        age: 50,
        firstName: 'Babe',
        lastName: 'Ruth',
        img: 'https://www.morningjournal.com/wp-content/uploads/2021/08/MJE-L-BABE-RUTH-BUSTER-0813-03.jpeg',
    }
]



let quotes: Quotes[] = [
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



// filtering by author or display all quotes
// app.get('/quotes', (req, res) => {
//     const search = req.query.search;

//     let match = quotes

//     if (typeof search === 'string') {

//         match = match.filter((quote) => quote.quote.toUpperCase().includes(search.toUpperCase())
//         );
//     }

//     res.send(match)
// });


app.get('/quotes', (req, res) => {
    let copyQuotes = JSON.parse(JSON.stringify(quotes))

    for (const quote of copyQuotes) {
        const author = authors.find(author => author.id === quote.authorId)
        quote.author = author
    }
    res.send(copyQuotes)
})




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
            authorId: author
            // author: author,
            // age: age,
            // firstName: firstName,
            // lastName: lastName,
            // img: img
        };

        quotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(400).send({ errors: errors });
    }
});


// patch 

app.patch('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)

    // data that we will update
    const quoteToChange = quotes.find((qte) => qte.id === id);

    //check if the property exist or not 

    if (quoteToChange) {
        if (typeof req.body.quote === 'string') quoteToChange.quote = req.body.quote
        if (typeof req.body.authorId === 'string') quoteToChange.quote = req.body.quote
        // if (typeof req.body.age === 'number') quoteToChange.age = req.body.age
        // if (typeof req.body.author === 'string') quoteToChange.author = req.body.author
        // if (typeof req.body.firstName === 'string') quoteToChange.firstName = req.body.firstName
        // if (typeof req.body.img === 'string') quoteToChange.img = req.body.img
        // if (typeof req.body.lastName === 'string') quoteToChange.lastName = req.body.lastName
        res.send(quoteToChange)
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});


app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = quotes.find(qte => qte.id === id)


    if (match) {

        quotes = quotes.filter(qte => qte.id !== id)
        res.send("quote deletet successfully")
    } else {
        res.status(404).send({ error: ' quote not found' })
    }
})


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})

