const express = require('express')
const fs = require('fs')
const app = express()

app.listen(3000, () => {console.log('Servicio 3000 Activado')})
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", 'utf8'))
    res.json(canciones)
})
app.post('/canciones', (req, res) => {
    const valorReq = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    canciones.push(valorReq)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('canción agregada!')
})
app.put('/canciones/:id', (req, res) => {
    const {id} = req.params
    const valorReq = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = valorReq
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('canción modificada!')
})
app.delete('/canciones/:id', (req, res) => {
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('canción eliminada!')
})
