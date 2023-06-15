const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express()
const port = 3001;
const fs = require('fs');

const client_url = {
    "development" : "*",
    "production" : "https://aromasdutyfree.com"
}

const environment = process.env.NODE_ENV;

app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', client_url[environment]);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { directory } = req.body;
        cb(null, `images/${directory}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('images', 1000), (req, res) => {
    res.send('Imagen cargada exitosamente');
});

app.put('/delete', (req, res) => {
    const { toDelete, directory } = req.body;

    toDelete.forEach(id => {
        fs.unlinkSync(`images/${directory}/${id}`)
    })

    res.send("ok");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})