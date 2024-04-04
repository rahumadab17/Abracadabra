const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
});

app.use(express.static("assets"));

const usuarios = {
    "usuarios": [
        "juan",
        "jocelyn",
        "astrid",
        "maria",
        "ignacia",
        "javier",
        "brian"
    ]
}

app.get("/abracadabra/usuarios", (req, res) => {
    res.send(usuarios);
})

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const authUser = req.params.usuario;
    const validUser = usuarios.usuarios;

    validUser.includes(authUser)
    ? next()
    : res.send('<center><img src="/img/who.jpeg"><p>Usuario no encontrado</p></center>');
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = Math.floor((Math.random()* (4)) + 1);
    const numero = req.params.n;

    numero == n
    ? res.sendFile(__dirname + '/conejito.html')
    : res.sendFile(__dirname + '/voldemort.html')
})

app.get("*", (req,res) => {
    res.send("Esta página no existe")
});