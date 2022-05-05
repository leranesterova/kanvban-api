const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/card', (req, res) => {
    res.send(cards);
})

let cards = [
        {id: '1', name: 'First Card', status: 'todo', priority: 2},
        {id: '2', name: 'Second Card', status: 'progress', priority: 5},
    ];


app.delete('/card/:cardId', (req, res) => {
    const cardId = req.params.cardId;
console.log(req)
    cards = cards.filter(el => el.id !== cardId)

    res.send(cards);
})

app.post('/card',(req, res)=> {
    const card = req.body;
    cards.push({ id: Math.random().toString(), ...card });
    res.send('Card created');
})

app.patch('/card/:cardId',(req, res)=> {
    const card = req.body;
    const cardId = req.params.cardId;

    cards = cards.map(el => el.id === cardId ? ({ ...card, id: el.id}) : el);
    res.send('Card updated');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})