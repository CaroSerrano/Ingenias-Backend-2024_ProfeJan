const express = require('express');
const productos = require('./productos'); 
const app = express();
const PORT = 3000;

function getAllProductos() {
    return productos ? productos.sort((a, b) => a.nombre.localeCompare(b.nombre)) :
        { id: 'Error', descripcion: 'No se encontraron coincidencias.' }
}

app.get('/productos', (req, res) => { 
    res.json(getAllProductos());
})

// Ruta para obtener un producto por ID
app.get('/productos/id/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.get('*', (req, res) => {
    res.status(403).send("Lo siento no es una ruta de mi proyecto! Ruta con get * ")
})
app.listen(PORT, () => console.log(`Node.js web server at port http://localhost:${PORT} is running..`));