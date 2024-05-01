document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const nombreDelCliente = document.querySelector(".nombreDelCliente");
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    try { // Manejo de errores de parsing
        if (nombreUsuario) {
            const nombreObjeto = JSON.parse(nombreUsuario); // Recuperar objetos JSON del localStorage y convertirlos a objetos
            nombreDelCliente.textContent = `Hola ${nombreObjeto.nombre}, te doy la bienvenida a Uñicornio.`;
        } else {
            modal.style.display = "block";
        }
    } catch (error) { // Manejo de errores de parsing
        console.error("Error al parsear el objeto almacenado en localStorage:", error);
        modal.style.display = "block"; // Si hay un error al parsear, mostrar el modal de todos modos
    }
})

function guardarNombre() {
    const nombre = document.getElementById("inputNombre").value;
    const nombreDelCliente = document.querySelector(".nombreDelCliente");

    if (nombre) {
        const nombreObjeto = { nombre: nombre }; //Convertir objetos a JSON antes de almacenarlos en el localStorage
        const nombreJSON = JSON.stringify(nombreObjeto);

        try { // Manejo de errores de parsing
            localStorage.setItem("nombreUsuario", nombreJSON);
            console.log("nombre guardado en storage", nombre);
            nombreDelCliente.textContent = `Hola ${nombre}, te doy la bienvenida a Uñicornio.`;
            cerrarModal();
        } catch (error) { //Manejo de errores de parsing
            console.error("Error al almacenar el objeto en localStorage:", error);
            // Si hay un error al guardar, continuar sin guardar y cerrar el modal
            nombreDelCliente.textContent = `Hola ${nombre}, te doy la bienvenida a Uñicornio.`;
            cerrarModal();
        }
    } else {
        console.log("Ingresa tu nombre");
    }
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}


// Definición del array que almacenar los elementos del carrito
let carrito = [];

// Servicios disponibles
const servicios = [
    {
        titulo: "Manicura Rusa",
        precio: 9000,
        img: "./img/manicuraRusa.jpg",
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

// Elementos del DOM
const contenedorServicios = document.querySelector("#servicios");
const carritoVacio = document.querySelector("#carritoVacio");
const carritoServicios = document.querySelector("#carritoServicios");
const precioTotal = document.querySelector("#precioTotal");

// Elementos de los servicios y botones de "Adquirir Servicio"
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

    // Agregar evento de clic para agregar al carrito al hacer clic en el botón
    btn.addEventListener("click", () => {
        agregarAlCarrito(servicio);
    });

    // Agregar el botón al div del servicio
    div.append(btn);

    // Agregar el div del servicio al contenedor de servicios
    contenedorServicios.append(div);
});

// Obtener todos los botones de "Adquirir Servicio" y agregarles eventos de clic
let botonesAgregar = document.querySelectorAll(".servicioBtn");
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        // Obtener el título del servicio correspondiente al botón clickeado
        let titulo = e.target.parentElement.querySelector("h3").innerText;
        // Encontrar el objeto de servicio correspondiente al título
        let servicioAsignado = servicios.find(servicio => servicio.titulo === titulo);
        // Agregar el servicio al carrito
        agregarAlCarrito(servicioAsignado);
    });
});

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    if (carrito.length === 0) {
        // Mostrar el mensaje de carrito vacío y ocultar el contenedor de servicios en el carrito
        carritoVacio.classList.remove("dNone");
        carritoServicios.classList.add("dNone");
    } else {
        // Ocultar el mensaje de carrito vacío y mostrar el contenedor de servicios en el carrito
        carritoVacio.classList.add("dNone");
        carritoServicios.classList.remove("dNone");

        // Limpiar el HTML del contenedor de servicios en el carrito
        carritoServicios.innerHTML = "";

        // Generar los elementos HTML para cada servicio en el carrito y agregar botones correspondientes
        carrito.forEach(servicio => {
            const div = document.createElement("div");
            div.classList.add("carritoServicio");
            div.innerHTML = `
            <div class="carritoServicio">
            <h3>${servicio.titulo}</h3>
            <p>$${servicio.precio} x ${servicio.cantidad}</p>
            <p>Subtotal: $${servicio.precio * servicio.cantidad}</p>
            </div>
            `;
            const botonRest = document.createElement("button");
            botonRest.classList.add("carritoServicioBtn");
            botonRest.innerText = "👇🏻";
            botonRest.addEventListener("click", () => {
                restarDelCarrito(servicio);
            })
            div.append(botonRest);

            const botonSumar = document.createElement("button");
            botonSumar.classList.add("carritoServicioBtn");
            botonSumar.innerText = "☝🏻";
            botonSumar.addEventListener("click", () => {
                sumarDelCarrito(servicio);
            })
            div.append(botonSumar);

            const botonElim = document.createElement("button");
            botonElim.classList.add("carritoServicioBtn");
            botonElim.innerText = "❌";
            botonElim.addEventListener("click", () => {
                borrarDelCarrito(servicio);
            })
            div.append(botonElim);

            // Agregar el servicio al contenedor de servicios en el carrito
            carritoServicios.append(div);
        })
    }
    // Actualizar el precio total en el carrito
    actualizarTotal();
}


// Función para agregar un servicio al carrito
const agregarAlCarrito = (servicio) => {
    console.log("Servicio recibido:", servicio);
    // Verificar si el servicio recibido está definido y tiene un título
    if (!servicio || !servicio.titulo) {
        console.error("El servicio no tiene un título definido o es undefined.");
        return;
    }

    // Buscar si el servicio ya está en el carrito
    const itemEncon = carrito.find(item => item.titulo === servicio.titulo);
    if (itemEncon) {
        itemEncon.cantidad++; // Si está en el carrito, aumentar la cantidad
    } else {
        carrito.push({ ...servicio, cantidad: 0}); // Si no está en el carrito, agregarlo con cantidad 1
    }
    actualizarCarrito(); // Actualizar la visualización del carrito
}

// Función para borrar un servicio del carrito
const borrarDelCarrito = (servicio) => {
    const prodIndex = carrito.findIndex(item => item.titulo === servicio.titulo);
    carrito.splice(prodIndex, 1); // Eliminar el servicio del carrito
    actualizarCarrito(); // Actualizar la visualización del carrito
};

// Función para restar un servicio del carrito
const restarDelCarrito = (servicio) => {
    if (servicio.cantidad !== 0) {
        servicio.cantidad--; // Restar uno a la cantidad del servicio en el carrito
    }
    actualizarCarrito(); // Actualizar la visualización del carrito
};

// Función para sumar un servicio al carrito
const sumarDelCarrito = (servicio) => {
    servicio.cantidad++; // Sumar uno a la cantidad del servicio en el carrito
    actualizarCarrito(); // Actualizar la visualización del carrito
};

// Función para actualizar el precio total del carrito
const actualizarTotal = () => {
    // Calcular el precio total sumando el precio de cada servicio multiplicado por su cantidad
    const total = carrito.reduce((acc, serv) => acc + (serv.precio * serv.cantidad), 0);
    precioTotal.innerText = `$${total}`; // Actualizar el elemento HTML que muestra el precio total
};

// Obtener el botón de comprar
const btnComprar = document.getElementById("btnComprar");

// Agregar un evento de clic al botón de comprar
btnComprar.addEventListener("click", () => {
    vaciarCarrito(); // Llama a una función para vaciar el carrito al hacer clic en el botón de comprar
});

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = []; // Vaciar el array de carrito
    actualizarCarrito(); // Actualizar la visualización del carrito

    // Mostrar un mensaje de agradecimiento
    const mensajeAgradecimiento = document.getElementById("mensajeAgradecimiento");
    mensajeAgradecimiento.innerHTML = `<h3>¡Muchas gracias por tu compra! ¡Te esperamos!🦄</h3>`;
    mensajeAgradecimiento.style.display = "block"; // Mostrar el mensaje de agradecimiento

    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
        mensajeAgradecimiento.style.display = "none"; // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
    }, 3000);
}

// Función inicial para actualizar la visualización del carrito
actualizarCarrito();
