const input = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");

document.addEventListener("DOMContentLoaded", mostrarTareas);
btnAgregar.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) return alert("Escribe una tarea!");

    const tareas = [...obtenerTareas(), { id: Date.now(), texto }];
    guardarTareas(tareas);
    input.value = "";
    mostrarTareas();
});

function mostrarTareas() {
    lista.innerHTML = "";
    obtenerTareas().forEach(({ id, texto }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${texto}</span>
            <div class="actions">
                <button class="edit">✏️</button>
                <button class="delete">🗑️</button>
            </div>
        `;

        li.querySelector(".delete").addEventListener("click", () => actualizarTareas(id));
        li.querySelector(".edit").addEventListener("click", () => {
            const nuevoTexto = prompt("Editar tarea:", texto)?.trim();
            if (nuevoTexto) actualizarTareas(id, nuevoTexto);
        });

        lista.appendChild(li);
    });
}

function actualizarTareas(id, nuevoTexto = null) {
    const tareas = obtenerTareas().map((t) =>
        t.id === id ? { ...t, texto: nuevoTexto || t.texto } : t
    ).filter((t) => nuevoTexto !== null || t.id !== id);

    guardarTareas(tareas);
    mostrarTareas();
}

const obtenerTareas = () => JSON.parse(localStorage.getItem("tareas")) || [];
const guardarTareas = (tareas) => localStorage.setItem("tareas", JSON.stringify(tareas));
