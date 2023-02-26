const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const { mergePdfs } = require('./merge')
// const { mergePdfs } = require('./merge')
const upload = multer({ dest: 'uploads/' })
const port = 3000
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    console.log("I am om : " + d);
    // res.send({ data: req.files })
    res.redirect(`http://localhost:${port}/static/${d}.pdf`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})