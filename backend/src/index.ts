import app from './server'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('REST API running in Port: ' + PORT)
})

app.get('/', (req, res) => { // respuesta en '/'
    res.send('Hellow Dan!')
})

export default app