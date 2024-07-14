const apiUrl = "http://localhost:8000/items"

async function obtenerProducto() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Error en obtenerProducto:', e);
        return null;
    }
}


async function eliminarProducto(id) {
    const itemAEliminar = apiUrl + "/" + id

    await fetch(itemAEliminar, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .catch(e => {
            console.error('Error al eliminar el producto:', e);
        });
        
}

async function agregarProducto(id, nombre, valor, imagen) {
    await fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id, nombre, valor, imagen)
    }
    )
        .catch(e => {
            console.error("Ha ocurrido un error al agregar el producto: ", e)
        })
}

export { obtenerProducto, eliminarProducto, agregarProducto }