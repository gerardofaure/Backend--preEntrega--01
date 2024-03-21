//--------------------------------------------- Librerias
const express = require("express");
const app = express();
const PUERTO = 8080;
//--------------------------------------------- Importar Rutas
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
//---------------------------------------------Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--------------------------------------------- Home
app.get("/", (req, res) => {
  res.send(
    '<div style="text-align: center;"><h1 style="color: blue; display: inline-block; background-color: yellow; padding: 10px;">BIENVENIDOS A SUPERMERCADOS EL LIDER</h1></div>'
  );
});
//---------------------------------------------Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
//---------------------------------------------Servidor
app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});
