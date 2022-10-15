const express = require('express');
const app = express();
const bp = require('body-parser');
const db = require('mongoose');

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(express.static('pages'));


db.connect('mongodb://127.0.0.1:27017/svburgerdb', () => { console.log('db connected') });

const userSchema = db.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const userList = db.model('users', userSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/html/index.html');
});

app.get('/sign-in', (req, res) => {
    res.sendFile(__dirname + '/pages/html/sign-in.html');
});

app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/pages/html/sign-up.html');
});

app.post('/sign-up', (req, res) => {
    let temp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const addUser = async (temp) => {
        await userList.insertMany(temp);
    }
    addUser(temp);
    res.sendFile(__dirname + '/pages/html/sign-in.html');
});

app.post('/sign-in', async (req, res) => {
    const checkUser = await userList.find({
        email: req.body.email,
        password: req.body.password
    });
    console.log(checkUser);
    if (checkUser.length == 0) {
        return res.json({ isSuccess: false, message: 'nov valid info' });
    }
    res.json({ isSuccess: true, data: checkUser[0] });
})

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + '/pages/html/menu.html');
})

// function to find the first username in the document




// function to delete a user
// const deleting = async () => {
//     const result = await userList.deleteOne({ firstName: 'amir' })
// }
// deleting();

app.listen('4000', () => { console.log('port connected') });