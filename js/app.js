// ====== Menu Hambuerguesa ====== //
const menu = document.querySelector(".hamburger");
const navegacion = document.querySelector(".navegacion");

document.addEventListener("DOMContentLoaded", () => {
  eventos();
  platillos();
});

const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  botonCerrar();
};
const botonCerrar = () => {
  const btnCerrar = document.createElement("p");
  const overlay = document.createElement("div");
  overlay.classList.add("pantalla-completa");
  const body = document.querySelector("body");
  if (document.querySelectorAll(".pantalla-completa").length > 0) return;
  body.appendChild(overlay);
  btnCerrar.textContent = "x";
  btnCerrar.classList.add("btn-cerrar");

  while (navegacion.children[5]) {
    navegacion.removeChild(navegacion.children[5]);
  }
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
};
const cerrarMenu = (boton, overlay) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    overlay.remove();
    boton.remove();
  });

  overlay.onclick = function () {
    overlay.remove();
    navegacion.classList.add("ocultar");
    boton.remove();
  };
};

// ====== Lazy loading Imagenes ====== //
const imagenes = document.querySelectorAll('img');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entries.isIntersecting) {
      const imagen = entry.target;
      observer.unobserve(imagen);
    }
  });  
});

imagenes.forEach((imagen) => {
  imagen.src = imagen.dataset.src;
  observer.observe(imagen);
});

// ====== Filtros Platillos ====== //
const btnTodos = document.querySelector(".todos");
const btnEnsaladas = document.querySelector(".ensaladas");
const btnPastas = document.querySelector(".pasta");
const btnPizza = document.querySelector(".pizza");
const btnPostres = document.querySelector(".postres");
const contenedorPlatillos = document.querySelector(".platillos");

const platillos = () => {
  let platilloArreglo = [];
  const platillos = document.querySelectorAll(".platillo");

  platillos.forEach(
    (platillo) => (platilloArreglo = [...platilloArreglo, platillo])
  );

  const ensaladas = platilloArreglo.filter(
    (ensalada) => ensalada.getAttribute("data-platillo") === "ensalada"
  );

  const pastas = platilloArreglo.filter(
    (pasta) => pasta.getAttribute("data-platillo") === "pasta"
  );

  const pizzas = platilloArreglo.filter(
    (pizza) => pizza.getAttribute("data-platillo") === "pizza"
  );

  const postres = platilloArreglo.filter(
    (postre) => postre.getAttribute("data-platillo") === "postre"
  );

  mostrarPlatillos(ensaladas, pastas, pizzas, postres, platilloArreglo);
};

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) => {
  btnEnsaladas.addEventListener("click", () => {
    limpiarHTML(contenedorPlatillos);
    ensaladas.forEach((ensalada) => contenedorPlatillos.appendChild(ensalada));
  });

  btnPastas.addEventListener("click", () => {
    limpiarHTML(contenedorPlatillos);
    pastas.forEach((pasta) => contenedorPlatillos.appendChild(pasta));
  });

  btnPizza.addEventListener("click", () => {
    limpiarHTML(contenedorPlatillos);
    pizzas.forEach((pizza) => contenedorPlatillos.appendChild(pizza));
  });

  btnPostres.addEventListener("click", () => {
    limpiarHTML(contenedorPlatillos);
    postres.forEach((postre) => contenedorPlatillos.appendChild(postre));
  });

  btnTodos.addEventListener("click", () => {
    limpiarHTML(contenedorPlatillos);
    todos.forEach((todo) => contenedorPlatillos.appendChild(todo));
  });
};

const limpiarHTML = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};
