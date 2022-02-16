
import { Router } from "express"
import { quotes } from "./quotes"

const router = Router()

export type Author = {
    id: number;
    author: string;
    age: number;
    firstName: string;
    lastName: string;
    img: string;
}

export let authors: Author[] = [
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


// filtering by ID Number
router.get('/', (req, res) => {
    let copyAuthors = JSON.parse(JSON.stringify(authors))

    for (const author of copyAuthors) {
        const authorQuotes = quotes.filter(quote => quote.authorId === author.id)
        author.quotes = authorQuotes
    }
    res.send(copyAuthors)
})


// filtering by ID Number
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = authors.find((author) => author.id === id);
    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});


//  pushing new data to quotes
router.post('/', (req, res) => {

    const errors = [];

    if (typeof req.body.firstName !== 'string') {
        errors.push('firstName missing or wrong data format')
    }

    if (typeof req.body.lastName !== 'string') {
        errors.push('lastName missing or wrong data format')
    }
    if (typeof req.body.age !== 'number') {
        errors.push('age missing or wrong data format')
    } if (typeof req.body.img !== 'string') {
        errors.push('image missing or wrong data format')
    }
    if (typeof req.body.author !== 'string') {
        errors.push('author missing or wrong data format')
    }

    if (errors.length === 0) {
        const author: Author = {
            id: Math.random(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            img: req.body.img,
            author: req.body.author

        }

        authors = [...authors, author]

        res.send(author)
    } else {
        res.status(400).send({ errors: errors });
    }
});


// patch 

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { author, lastName, firstName, age, img } = req.body
    // data that we will update

    const authorToChange = authors.find((author) => author.id === id);

    //check if the property exist or not 

    if (authorToChange) {
        if (typeof author === 'string') authorToChange.author = author
        if (typeof lastName === 'string') authorToChange.lastName = lastName
        if (typeof firstName === 'string') authorToChange.firstName = firstName
        if (typeof age === 'number') authorToChange.age = age
        if (typeof img === 'string') authorToChange.img = img
        res.send(authorToChange)
    } else {
        res.status(404).send({ error: 'quote not found.' });
    }
});


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const match = authors.find(author => author.id === id)


    if (match) {

        authors = authors.filter(qte => qte.id !== id)
        res.send("quote deletet successfully")
    } else {
        res.status(404).send({ error: ' quote not found' })
    }
})


export default router
