const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.render(path.join(__dirname, "views/index"));
});

app

    .engine('.html', require('ejs').renderFile)

    .set('views', path.join(__dirname, 'views'))

    .set('view engine', 'ejs')

    .use(express.static(path.join(__dirname, 'public')))

    .use("/", router)

    .listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });