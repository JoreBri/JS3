document.getElementById('enviar').addEventListener('click', function() {
    var nombre = document.getElementById('Nombre').value;
    var mensajeBienvenida = document.getElementById('mensajeBienvenida');
    mensajeBienvenida.textContent = 'Hola ' + nombre + ', Bienvenido a Uñicornio';
    
    // Ocultar el cuadro de nombre
    var cuadroNombre = document.getElementById('pedirNombre');
    cuadroNombre.style.display = 'none';
});

const carrito = [];

const servicios =[
    {
        titulo: "Manicura Rusa",
        precio: 9000,
        img: "img/manicuraRusa.jpg",
        texto: "Experimenta el cuidado clásico y la elegancia con nuestra manicura rusa. Perfecta para mantener tus uñas impecables en todo momento"
    },
    {
        titulo: "Esmaltado Semipermanente Liso",
        precio: 10000,
        img: "./img/semiLiso.jpg",
        texto: "Disfruta de un esmaltado duradero y brillante que te acompañará por semanas. Nuestra amplia variedad de colores te permitirá expresar tu estilo único"
    },
    {
        titulo: "Esmaltado Semipermanente con Diseño",
        precio: 10500,
        img: "./img/esmaltadoSemiLiso.jpg",
        texto: "Disfruta de un esmaltado duradero y brillante que te acompañará por semanas. Eligiendo el diseño que perfecto para tu estilo único"
    },
    {
        titulo: "Capping Liso",
        precio: 11000,
        img: "./img/cappingLiso.jpg",
        texto: "Tratamiento especializado para fortalecer y nutrir tus uñas, dejándolas saludables y radiantes en los colores que mas te gusten"
    },
    {
        titulo: "Capping con diseño",
        precio: 11500,
        img: "./img/cappingDiseño.jpg",
        texto: "Tratamiento especializado para fortalecer y nutrir tus uñas, dejándolas saludables y radiantes. Con el diseño que mas te guste"
    },
    {
        titulo: "Esculpidas Lisas",
        precio: 13000,
        img: "./img/esculpidasLisas.jpg",
        texto: "Transforma tus uñas con nuestra técnica de escultura. Obtén uñas fuertes y hermosas con formas y longitudes personalizadas"
    },
    {
        titulo: "Esculpidas con diseño",
        precio: 13500,
        img: "./img/esculpidasDiseño.jpg",
        texto: "Transforma tus uñas con nuestra técnica de escultura. Obtén uñas fuertes y hermosas con formas y longitudes personalizadas"
    }
];

const contenedorServicios = document.querySelector("#servicios");
const carritoVacio = document.querySelector ("#carritoVacio");
const carritoServicios = document.querySelector ("#carritoServicios");
const precioTotal = document.querySelector ("#precioTotal");

servicios.forEach((servicio) => {
    const div = document.createElement("div");
    div.classList.add("servicio");
    div.innerHTML= `<img class="servicioImg" src="${servicio.img}" alt= "${servicio.titulo}">
    <p class= "servicioTexto"> ${servicio.texto}.</p>
    <h3>${servicio.titulo}</h3>
    <p>$${servicio.precio}</p>
    `;
    
    const btn = document.createElement("button");
    btn.classList.add("servicioBtn");
    btn.innerText = "Adquirir Servicio";

    btn.addEventListener ("click", () => {
        agregarAlCarrito(servicio);
    })

    div.append (btn);
    contenedorServicios.append(div);
})

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("dNone");
    carritoServicios.classList.add("dNone");
} else {
        carritoVacio.classList.add("dNone");
    carritoServicios.classList.remove("dNone");
    carritoServicios.innerHTML = "";
            carrito.forEach(servicio => {
                    const div = document.createElement("div");
                div.classList.add("carritoServicio");
                div.innerHTML = `
                    <h3>${servicio.titulo}</h3>
                    <p>$${servicio.precio}</p>
                    <p>Cant: ${servicio.cantidad}</p>
                     <p>Subt: $${servicio.cantidad * servicio.precio}</p>
                `;

    const btn = document.createElement("button");
                    btn.classList.add("carrito-producto-btn");
                    btn.innerText = "✖️";

        btn.addEventListener("click", () => {
                            borrarDelCarrito(servicio);
                    })

        div.append(btn);

        carritoServicios.append(div)
                })
            }
            actualizarTotal();
        }


// Se va a llamar cuando agregue un producto al carrito
// Primero chequea si está el elemento, y si está le suma 1 a cantidad; si no está, lo pushea
const agregarAlCarrito = (servicio) => {
    const itemEncontrado = carrito.find(item => item.titulo === servicio.titulo);
if (itemEncontrado) {
    itemEncontrado.cantidad++;
} else {
    carrito.push({...servicio, cantidad: 1});
}

actualizarCarrito();
}

const borrarDelCarrito = (servicio) => {
const prodIndex = carrito.findIndex(item => item.titulo === servicio.titulo);
carrito.splice(prodIndex, 1);
actualizarCarrito();
}

const actualizarTotal = () => {
 const total = carrito.reduce((acc, serv) => acc + (serv.precio * serv.cantidad), 0);
carritoTotal.innerText = `$${total}`;
}