//--------------------------------------------- importamos los modulos necesarios
const fs = require("fs").promises;
//--------------------------------------------- definimos la clase  que se encargara de manejar el carrito
class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.ultId = 0;

    //--------------------------------------------- cargamos los carritos
    this.cargarCarritos();
  }
  async cargarCarritos() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      if (this.carts.length > 0) {
        //--------------------------------------------- Verificar si hay carritos
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch (error) {
      console.log("Error al crear los carritos: ", error);
      //--------------------------------------------- En caso de que no exista el archivo lo creamos.
      await this.guardarCarritos();
    }
  }
  async guardarCarritos() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }
  async crearCarrito() {
    const nuevoCarrito = {
      id: ++this.ultId,
      products: [],
    };

    this.carts.push(nuevoCarrito);
    //--------------------------------------------- Guardamos el carrito
    await this.guardarCarritos();
    return nuevoCarrito;
  }
  //--------------------------------------------- funcion para obtener un carrito por id
  async getCarritoById(carritoId) {
    try {
      const carrito = this.carts.find((c) => c.id === carritoId);
      if (!carrito) {
        console.log("No hay carrito con ese id");
        return;
      }
      return carrito;
    } catch (error) {
      console.log("Error al obtener un carrito por id: ", error);
    }
  }
  //--------------------------------------------- funcion para agregar un producto al carrito
  async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
    const carrito = await this.getCarritoById(carritoId);
    const existeProducto = carrito.products.find(
      (p) => p.product === productoId
    );
    if (existeProducto) {
      existeProducto.quantity += quantity;
    } else {
      carrito.products.push({ product: productoId, quantity });
    }
    await this.guardarCarritos();
    return carrito;
  }
  //--------------------------------------------------- funcion para eliminar un producto del carrito
  async eliminarProductoDelCarrito(carritoId, productId) {
    const carrito = await this.getCarritoById(carritoId);
    const index = carrito.products.findIndex((p) => p.product === productId);
    if (index !== -1) {
      carrito.products.splice(index, 1);
    }
    await this.guardarCarritos();
    return carrito;
  }
}
module.exports = CartManager;
