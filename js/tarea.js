const input = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");


document.addEventListener("DOMContentLoaded", cargarTareas);


btnAgregar.addEventListener("click", agregarTarea);


function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") return alert("Escribe una tarea!");

    const tarea = { id: Date.now(), texto: texto };
    let tareas = obtenerTareas();
    tareas.push(tarea);
    guardarTareas(tareas);

    input.value = "";
    mostrarTareas();
}

function mostrarTareas() {
    lista.innerHTML = "";
    let tareas = obtenerTareas();

    tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${tarea.texto}</span>
    <div class="actions">
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
    </div>
    `;

    li.querySelector(".delete").addEventListener("click", () => {
    eliminarTarea(tarea.id);
});


    li.querySelector(".edit").addEventListener("click", () => {
    const nuevoTexto = prompt("Editar tarea:", tarea.texto);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        editarTarea(tarea.id, nuevoTexto.trim());
    }
});

    lista.appendChild(li);
    });
}

function eliminarTarea(id) {
    let tareas = obtenerTareas().filter((t) => t.id !== id);
    guardarTareas(tareas);
    mostrarTareas();
}

function editarTarea(id, nuevoTexto) {
    let tareas = obtenerTareas().map((t) =>
    t.id === id ? { ...t, texto: nuevoTexto } : t
);
    guardarTareas(tareas);
    mostrarTareas();
}

function obtenerTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    mostrarTareas();
}
