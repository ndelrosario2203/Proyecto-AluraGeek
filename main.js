import { obtenerProducto, eliminarProducto, agregarProducto } from "./api/apiService.js";

const dataFormulario = document.querySelector('[data-formulario]');
const dataProductos = document.querySelector('[data-productos]');

console.log(dataProductos);

console.log(obtenerProducto());

function obtenerId(datos) {
    let nuevoId = (datos.length > 0 ? parseInt(datos[datos.length - 1].id) + 1 : 1).toString();
    while (datos.some(d => d.id === nuevoId)) {
        nuevoId = (parseInt(nuevoId) + 1).toString();
    }
    return nuevoId;
}

async function cargaDeProductos() {

    try {
        const items = await obtenerProducto();
        console.log(items);
        dataProductos.innerHTML = ``;
        items.forEach(item => {
            const items = document.createElement('div');
            items.classList.add("item");
            items.innerHTML = `
        
                            <div class="producto">
                            <img src="${item.imagen}" alt="Foto del producto">
                            <div class="nombreContenedor">
                                <p>${item.nombre}</p>
                            </div>
                            <div class="precio">
                                <p>RD$${item.valor}</p>
                                <i class="fa-solid fa-trash eliminar" data-id="${item.id}" style="color: #ffffff;"></i>
                            </div>
                        </div>
        `
            dataProductos.appendChild(items);
        });
    }
    catch (error) {
        console.log(error);
    }
}

dataFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const items = await obtenerProducto();
    const id = obtenerId(items);

    const nombre = document.querySelector("[data-nombre]").value
    const valor = document.querySelector("[data-precio]").value
    const imagen = document.querySelector("[data-imagen]").value
    const item = { id, nombre, valor, imagen }

    agregarProducto(item);

})

dataProductos.addEventListener('click', async (e) => {
    e.preventDefault();
    const idEliminar = e.target.dataset.id;
    if (idEliminar >= 0) {
        console.log(idEliminar);
        eliminarProducto(idEliminar);
    }

})

cargaDeProductos();



