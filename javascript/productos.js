import Producto, { obtenerVelas } from './classVelas.js';
import { validacionDeSesion } from './validacionInicioSesion.js';
obtenerVelas()
  .then((resp) => resp.json())
  .then((data) => {
    const arrayStock = [];
    data.forEach((element) => {
      const nuevoProducto = new Producto(
        element.id,
        element.nombre,
        element.peso,
        element.aroma,
        element.precio,
        element.imagen
      );
      arrayStock.push(nuevoProducto);
    });
    return arrayStock;
  })
  .then((arrayStock) => {
    validacionDeSesion();
    // Desestructuraciones
    const nombreProducto = (productoADesestructurar) => {
      const { nombre } = productoADesestructurar;
      return nombre;
    };
    const precioProducto = (productoADesestructurar) => {
      const { precio } = productoADesestructurar;
      return precio;
    };

    // Variables
    let subtotalMostrado = [];
    let subtotalGuardadoLS = localStorage.getItem('carritoValor');
    let carrito = JSON.parse(localStorage.getItem('carritoAgregado'))?.carrito || [];
    // GetElement
    let main = document.getElementById('main');
    let divCarrito = document.getElementById('divCarrito');
    let divFiltroAroma = document.getElementById('divFiltroAroma');
    let carritoLista = document.getElementById('carritoLista');
    let subtotalProductos = document.getElementById('subtotalProductos');
    let vaciarCarrito = document.getElementById('vaciarCarrito');
    let busqueda = document.getElementById('busqueda');
    let lupa = document.getElementById('lupa');
    //getElement (Checkbox Precio)
    let primerCheckboxPrecio = document.getElementById('menosDeMil');
    let segundoCheckboxPrecio = document.getElementById('EntreXeY');
    let tercerCheckboxPrecio = document.getElementById('desde');
    let mostrarTodosProductos = document.getElementById('inputMostrarTodo');
    // CreateElement
    let containerInput = document.createElement('div');

    //Funciones
    function tareaConReduce() {
      //Funcion para reducir el carrito
      return subtotalMostrado.reduce(
        (previo, actual) => previo + actual,
        +subtotalGuardadoLS
      );
    }

    //Muestra en el carrito la cantidad de productos agregados
    function mostrarLiProductos(arrayConProductos) {
      carritoLista.innerText = ``;
      arrayConProductos.forEach((element) => {
        let liProducto = document.createElement('li');
        liProducto.textContent = `${element.item.nombre} x${element.cantidad}uni.`;
        liProducto.classList.add('cantidadProductos');
        carritoLista.appendChild(liProducto);
      });
    }

    //Suma a 'carrito' los productos, si ya habia anteriormente uno solo le suma la cantidad
    function pushProductosACarrito(vela) {
      const indexVelaEnCarrito = carrito.findIndex((v) => {
        return v.item.nombre == arrayStock[vela].nombre;
      });
      let abc =
        indexVelaEnCarrito === -1
          ? carrito.push({ cantidad: 1, item: arrayStock[vela] })
          : carrito[indexVelaEnCarrito].cantidad++;
      localStorage.setItem('carritoAgregado', JSON.stringify({ carrito }));
    }

    function subtotal(vela) {
      pushProductosACarrito(vela);
      mostrarLiProductos(carrito);
      //Obtencion de subtotal y agrega al LocalStorage
      subtotalMostrado.push(precioProducto(arrayStock[vela]));
      subtotalProductos.innerText = `Subtotal: $${tareaConReduce()}`;
      let subtotalLS = tareaConReduce();
      divCarrito.append(containerInput);
      if (subtotalMostrado !== '') {
        localStorage.setItem('carritoValor', subtotalLS);
      }
    }

    //anade a carrito si hay algo en localstorage
    function cargarProductosCarritoLocalStorage() {
      let unidadesEnLocalStorage = JSON.parse(
        localStorage.getItem('carritoAgregado')
      );
      if (unidadesEnLocalStorage != null) {
        unidadesEnLocalStorage.carrito.forEach((element) => {
          let liProducto = document.createElement('li');
          liProducto.textContent = `${element.item.nombre} x${element.cantidad}uni.`;
          liProducto.classList.add('cantidadProductos');
          carritoLista.appendChild(liProducto);
        });
      }
    }

    // CARGA AUTOMATICA DE CARDS Y CARRITO
    function cargaProductos(arFiltrado) {
      carritoLista.innerHTML = '';
      cargarProductosCarritoLocalStorage();
      main.innerHTML = '';
      arFiltrado.forEach((vela) => {
        // Estructura Card
        const card = document.createElement('div');
        card.classList.add('card');
        // Imagen
        const imagenProducto = document.createElement('img');
        imagenProducto.classList.add('card-img-top');
        imagenProducto.setAttribute('src', vela.imagen);
        imagenProducto.setAttribute('alt', nombreProducto(vela));
        // Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Titulo
        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = `${nombreProducto(vela)}`;
        // Texto
        const textoCard = document.createElement('p');
        textoCard.classList.add('card-text');
        textoCard.innerHTML = `Vela disponible en aroma/s: ${vela.aroma}. <br> Peso de: ${vela.peso}`;
        // Div Compra
        const cardCompra = document.createElement('div');
        cardCompra.classList.add('card-compra');
        // Precio
        const cardPrecio = document.createElement('p');
        cardPrecio.classList.add('precio');
        cardPrecio.textContent = `$${precioProducto(vela)}`;
        // Boton
        const botonCompra = document.createElement('button');
        botonCompra.classList.add('btnCompra');
        botonCompra.textContent = '+';
        botonCompra.addEventListener('click', () => subtotal(vela.id - 1));
        // Agrega elementos al DOM
        card.appendChild(imagenProducto);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(textoCard);
        card.appendChild(cardCompra);
        cardCompra.appendChild(cardPrecio);
        cardCompra.appendChild(botonCompra);
        main.appendChild(card);
      });
      subtotalProductos.innerText = !subtotalGuardadoLS
        ? `Subtotal: $0`
        : `Subtotal: $${subtotalGuardadoLS}`; //Valor que muestra en el subtotal en caso de no haber nada en carrito
      //Boton para borrar TODO el carrito
      divCarrito.append(vaciarCarrito);
      vaciarCarrito.addEventListener('click', () => {
        subtotalMostrado.splice(0, subtotalMostrado.length);
        subtotalProductos.innerText = `Has vaciado el carrito`;
        carritoLista.innerHTML = '';
        subtotalGuardadoLS = 0;
        carrito = [];
        localStorage.removeItem('carritoValor');
        localStorage.removeItem('carritoAgregado');
      });
    }

    //Funcion para el filtro de precios
    function checkboxPrecio(param) {
      const filtroPorPrecio = () => {
        const arFiltradoPrecio = // arrayStock.filter((vela)=>{
          //   return vela.precio <= primerCheckboxPrecio.value
          // });
          param;
        cargaProductos(arFiltradoPrecio);
      };
      filtroPorPrecio(arrayStock);
    }

    //funcion que filtra por aroma seleccionado
    const filtroPorAroma = (aroma) => {
      const arFiltradoAroma = arrayStock.filter((vela) => {
        return vela.aroma.includes(aroma.value) == true;
      });
      arFiltradoAroma.length == 0
        ? (main.innerHTML = `Producto no encontrado`)
        : cargaProductos(arFiltradoAroma);
    };

    //Funcion para barra de busqueda
    const filtroPorBusqueda = () => {
      const busquedaUsuario = busqueda.value.toUpperCase();
      const arFiltrado = arrayStock.filter((vela) => {
        return nombreProducto(vela).includes(busquedaUsuario) == true;
      });
      arFiltrado.length == 0
        ? (main.innerHTML = `Producto no encontrado`)
        : cargaProductos(arFiltrado);
    };

    //creacion de filtro aromas en HTML
    let idAromas = 1; //genera ID dinamicos
    for (const vela of arrayStock) {
      let containerInput = document.createElement('div');
      containerInput.innerHTML = `<div class="containerInput" id="containerInput"><input type="radio" value="${
        vela.aroma
      }" name="filtro" id="aroma${idAromas++}"><label for="no">${
        vela.aroma
      }</label></div>`;
      divFiltroAroma.append(containerInput);
    }

    //--------------------DOM-----------------------------
    cargaProductos(arrayStock); //Llamado para cargar los productos
  
    // Busqueda con input y lupa
    lupa.addEventListener('click', filtroPorBusqueda);
    busqueda.addEventListener('keyup', () => {
      busqueda.value == '' ? cargaProductos(arrayStock) : filtroPorBusqueda();
    });

    //Filtro Por Precio
    //Filtro que carga todos los productos
    mostrarTodosProductos.addEventListener(
      'change',
      () => cargaProductos(arrayStock),
      false
    );
    //Primer check
    primerCheckboxPrecio.addEventListener(
      'change',
      () =>
        checkboxPrecio(
          arrayStock.filter((vela) => {
            return vela.precio <= primerCheckboxPrecio.value;
          })
        ),
      false
    );
    //Segundo check
    segundoCheckboxPrecio.addEventListener(
      'change',
      () =>
        checkboxPrecio(
          arrayStock.filter((vela) => {
            return (
              vela.precio > segundoCheckboxPrecio.value &&
              vela.precio < tercerCheckboxPrecio.value
            );
          })
        ),
      false
    );
    //Tercer check
    tercerCheckboxPrecio.addEventListener(
      'change',
      () =>
        checkboxPrecio(
          arrayStock.filter((vela) => {
            return vela.precio >= tercerCheckboxPrecio.value;
          })
        ),
      false
    );
    //Toma checkbox de aromas y les agrega su evento
    document
      .getElementById('aroma1')
      .addEventListener('change', () => filtroPorAroma(aroma1), false);
    document
      .getElementById('aroma2')
      .addEventListener('change', () => filtroPorAroma(aroma2), false);
    document
      .getElementById('aroma3')
      .addEventListener('change', () => filtroPorAroma(aroma3), false);
    document
      .getElementById('aroma4')
      .addEventListener('change', () => filtroPorAroma(aroma4), false);
  });