const fs = require('fs');
const bodyParser = require('body-parser');
const jsonserver = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonserver.create();
const userDb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(jsonserver.defaults());


const SECRET_KEY = '857384338';
const expiresIn = "1h";

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ email, password }) {
    return (
        userDb.users.findIndex((user) => user.email === email && user.password === password) !== -1
    )
}

server.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
    if (!isAuthenticated({ email, password })) {
        const status = 401;
        const message = "email and password already exists"
        return res.status(status).json({ status, message })
    }

    fs.readFileSync("./users.json", (err, data) => {
        if (err) {
            const status = 401;
            const message = err
            return res.status(status).json({ status, message })
        }

        data = JSON.parse(data.toString());
        let last_item_id = data.users(data.users.length - 1).id;
        data.users.push({ id: last_item_id + 1, email: email, password: password });
        let writeData = fs.writeFileSync("./users.json", JSON.stringify(data), (err, result) => {
            if (err) {
                const status = 401;
                const message = err
                return res.status(status).json({ status, message });
            }
        });

        const access_token = createToken({ email, password });
        return res.status(200).json({ access_token });
    });
});

server.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!isAuthenticated({ email, password })) {
        const status = 401;
        const message = "Incorrect Email or Password"
        return res.status(status).json({ status, message })
    }
    const access_token = createToken({ email, password });
    return res.status(200).json({ access_token });
});

server.listen("5000","localhost",()=>{
    console.log("Server are Running at http://localhost:5000");
});

