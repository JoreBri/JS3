document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const nombreDelCliente = document.querySelector(".nombreDelCliente");
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    if (nombreUsuario) {
        nombreDelCliente.textContent = `Hola ${nombreUsuario}, te doy la bienvenida a Uñicornio.`;
    } else {
        modal.style.display = "block";
    }
})

function guardarNombre() {
    const nombre = document.getElementById("inputNombre").value;
    const nombreDelCliente = document.querySelector(".nombreDelCliente");

    if (nombre) {
        localStorage.setItem("nombreUsuario", nombre);
        console.log("nombre guardado en storage", nombre);
        nombreDelCliente.textContent = `Hola ${nombreUsuario}, te doy la bienvenida a Uñicornio.`;
        cerrarModal();
    } else {
        console.log("Ingresa tu nombre");
    }
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
const numerito = document.querySelector("#numerito");

servicios.forEach((servicio) => {
    const div = document.createElement("div");
    div.classList.add("servicio");
    div.innerHTML = `
    <h3>${servicio.titulo}</h3>
    <img class="servicioImg" src="${servicio.img}" alt="${servicio.titulo}">
    <p class="servicioTexto">${servicio.texto}.</p>
    <p>$${servicio.precio}</p>`;

    const btn = document.createElement("button");
    btn.classList.add("servicioBtn");
    btn.innerText = "Adquirir Servicio";

    btn.addEventListener("click", () => {
        agregarAlCarrito(servicio);
    });

    div.append(btn);
    contenedorServicios.append(div);
});

let botonesAgregar = document.querySelectorAll(".botonAgregar");
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        let id = e.target.id;
        let servicioAsignado = servicios.find(prod => prod.id === id);
        agregarAlCarrito(servicioAsignado);
    })
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
            <p>Subt: $${servicio.cantidad * servicio.precio}</p>
            `;
            const botonRest = document.createElement("button");
            botonRest.classList.add("carritoServicioBtn");
            botonRest.innerText= "👇🏻";
            botonRest.addEventListener("click", () =>{
                restarDelCarrito(servicio);
            })
            div.append(botonRest);

            const botonSumar =document.createElement("button");
            botonSumar.classList.add("carritoServicioBtn");
            botonSumar.innerText = "☝🏻";
            botonSumar.addEventListener("click", () =>{
                sumarDelCarrito(servicio);
            })
            div.append(botonSumar);

            const botonElim = document.createElement("button");
            botonElim.classList.add("carritoServicioBtn");
            botonElim.innerText = "❌";
            botonElim.addEventListener("click", () =>{
                borrarDelCarrito(servicio);
            })
            div.append(botonElim);

            carritoServicios.append(div);
        })
    }
    calcularNumerito();
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const agregarAlCarrito = (servicio) => {
    const itemEncon = carrito.find(item => item.titulo === servicio.titulo);
    if (itemEncon) {
        itemEncon.cantidad++;
    } else{
        carrito.push({...servicio, cantidad: 1});
    }
    actualizarCarrito();

}
const borrarDelCarrito = (servicio) => {
    const servIndex = carrito.findIndex(item => item.titulo === servicio.titulo);
    carrito.splice(servIndex, 1);
    actualizarCarrito();
}
const restarDelCarrito =(servicio) => {
    if (servicio.cantidad !==1){
        servicio.cantidad--;
    }
    actualizarCarrito();
}
const sumarDelCarrito = (servicio) => {
    servicio.cantidad++;
    actualizarCarrito();
}
const actualizarTotal = () => {
    const total = carrito.reduce((acc, serv) => acc + (serv.precio * serv.cantidad), 0);
    precioTotal.innerText = `$${total}`;
}

actualizarCarrito();