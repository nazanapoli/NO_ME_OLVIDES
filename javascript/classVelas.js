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
export const arrayStock = [
  new Producto(1,'Vela Apoel','500g','Coconut',670,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/218fcfac-ceef-4def-8741-d89354205f28-2548678907693e45d716442702125362-640-0.jpeg'),
  new Producto(2,'Vela Burgio','350g','Lemon Grass',900,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/b377a23a-e5b6-40cc-9f05-fb4ba9a34e1d-494f38c12054145f3116346029035665-640-0.jpeg'),
  new Producto(3,'Vela Casteldefells','475g','Vainilla',1599,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/8e7a69cb-8b9d-4cdf-8d2d-97ba44dcdfd3-012cc258c7d14151f316442582167641-1024-1024.jpeg'),
  new Producto(4,'Vela Dinamo','270g','Chocolate',1099,'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/261/858/products/fc271cb4-6163-418f-b87c-b52b0279d715_nube-764eb6126f8a181d3616065106131993-640-0.jpg'),
];