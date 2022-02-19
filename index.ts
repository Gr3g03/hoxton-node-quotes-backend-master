import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

// import quoteRouter from './quotes';
// import authorRouter from './authors';
// app.use('/quotes', quoteRouter);
// app.use('/authors', authorRouter);


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;


const db = new Database('./data.db', {
    verbose: console.log,
});

const deleteTable = db.prepare(`
DELETE FROM quotes;
`)
deleteTable.run()


// const dropQuotesTable = db.prepare('DROP TABLE quotes;');
// dropQuotesTable.run();


const createQuote = db.prepare(`
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER NOT NULL,
        quote TEXT NOT NULL,
        author TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        image TEXT NOT NULL,
        PRIMARY KEY (id)
    );
`)


createQuote.run()



const quotess = [
    {
        quote: 'Many of lifes failures are people who did not realize how close they were to success when they gave up',
        author: 'Thomas A. Edison',
        age: 50,
        firstName: 'Thomas',
        lastName: 'Edison',
        image: 'https://compote.slate.com/images/3a53f815-fac0-4a76-9f80-f513178caffc.jpg%22',
    },
    {
        quote: 'Make memes, not war!',
        author: 'Mark',
        age: 50,
        firstName: 'Mark',
        lastName: 'Mark',
        image: 'https://www.theparisreview.org/blog/wp-content/uploads/2017/11/audiobook-mark-twain-01-lamano-studio-photography-animation-cgi-character-design-craft-illustration-post-production-1-e1510775155945.jpg',
    },
    {
        quote: 'Stop making quotes I never said!',
        author: 'Albert Einstein',
        age: 50,
        firstName: 'Albert',
        lastName: 'Einstein',
        image: 'https://parade.com/wp-content/uploads/2021/08/albert-einstein-quotes.jpg',
    },
    {
        quote: 'The purpose of our lives is to be happy.',
        author: 'Dalai Lama',
        age: 50,
        firstName: 'Dalai',
        lastName: 'Lama',
        image: 'https://images-cdn.9gag.com/photo/10706_700b.jpg',
    },
    {
        quote: 'Life is what happens when youre busy making other plans.',
        author: 'John Lennon',
        age: 50,
        firstName: 'John',
        lastName: 'Lennon',
        image: 'https://www.thatericalper.com/wp-content/uploads/2015/03/John-Lennons-Funny-Faces-1966-1.jpg',
    },
    {
        quote: 'Get busy living or get busy dying.',
        author: 'Stephen King',
        age: 50,
        firstName: 'Stephen',
        lastName: 'King',
        image: 'https://imgix.ranker.com/list_img_v2/65/2860065/original/2860065',
    },
    {
        quote: 'You only live once, but if you do it right, once is enough.',
        author: 'Mae West',
        age: 50,
        firstName: 'Mae',
        lastName: 'West',
        image: 'https://lwlies.com/wp-content/uploads/2019/08/mae-west-sex.jpg',
    }
];

const insertIntoQuotes = db.prepare(` 
INSERT INTO quotes (quote, author, firstName, lastName, age, image) VALUES (?, ?, ?, ?, ?,?);
`)

for (const addquote of quotess) {
    insertIntoQuotes.run(addquote.quote, addquote.author, addquote.firstName, addquote.lastName, addquote.age, addquote.image)
}



const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`)



app.get('/quotes', (req, res) => {
    const allQuotes = getAllQuotes.all()

    res.send(allQuotes)
})


// filtering by ID Number
// app.get('/quotes/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const match = quotes.find((quote) => quote.id === id);
//     if (match) {
//         res.send(match);
//     } else {
//         res.status(404).send({ error: 'quote not found.' });
//     }
// });



//  pushing new data to quotes
// app.post('/', (req, res) => {

//     const errors = [];

//     if (typeof req.body.authorId !== 'number') {
//         errors.push('authorId missing or wrong data format')
//     }

//     if (typeof req.body.quote !== 'string') {
//         errors.push('quote missing or wrong data format')
//     }

//     if (errors.length === 0) {
//         const quote: Quotes = {
//             quote: req.body.quote,
//             authorId: req.body.authorId
//         }

//         quotes = [...quotes, quote]

//         res.send(quote)
//     } else {
//         res.status(400).send({ errors: errors });
//     }
// });


// patch 

// app.patch('/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const { quote, authorId } = req.body
//     // data that we will update

//     const quoteToChange = quotes.find((qte) => qte.id === id);

//     //check if the property exist or not 

//     if (quoteToChange) {
//         if (typeof quote === 'string') quoteToChange.quote = quote
//         if (typeof authorId === 'string') quoteToChange.quote = quote
//         res.send(quoteToChange)
//     } else {
//         res.status(404).send({ error: 'quote not found.' });
//     }
// });


// app.delete('/:id', (req, res) => {
//     const id = Number(req.params.id)

//     const match = quotes.find(qte => qte.id === id)


//     if (match) {

//         quotes = quotes.filter(qte => qte.id !== id)
//         res.send("quote deletet successfully")
//     } else {
//         res.status(404).send({ error: ' quote not found' })
//     }
// })


app.listen(PORT, () => {
    console.log(`Server is up and running on: http://localhost:${PORT}/quotes `);
})