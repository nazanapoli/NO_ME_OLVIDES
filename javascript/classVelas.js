export default class Producto {
    constructor(id, nombre, peso, aroma, precio, imagen) {
      this.id = id;
      this.nombre = nombre.toUpperCase();
      this.peso = peso;
      this.aroma = aroma;
      this.precio = precio;
      this.imagen = imagen;
    }
}