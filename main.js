let btnBuscar = document.getElementById("buscar")
let btnRestablecer = document.getElementById("restablecer")
const pokeImg = document.querySelector('[data-poke-img]');
const iconoMenu = document.querySelector('#icono-menu'),
    menu = document.querySelector('#menu');

iconoMenu.addEventListener('click', (e) => {

    // Alternamos estilos para el menu 
    menu.classList.toggle('active');


    // Alternamos su atributo 'src' para el ícono del menú y regresar al icono de la pokebola

    const rutaActual = e.target.getAttribute('src');

    if (rutaActual == './src/img/pokeball.png') {
        e.target.setAttribute('./src/img/pokeball.png');
    } else {
        e.target.setAttribute('./src/img/pokeball.png');
    }
});



btnBuscar.addEventListener("click", () => {
    let pokemon = document.getElementById("getPokemon").value
    getPokemon(pokemon)

});


btnRestablecer.addEventListener("click", function () {
    return restaValores()
})


//Se crea una funcion asincrona para traer los valores de la api rest
async function getPokemon(pokemon) {

    const key = pokemon.toLowerCase()
    //Mediante un Try y catch intentamos generar una solicitud que espere los valores 
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}/`);
        if (response.status === 200) {
            const data = await response.json()
            renderPokemon(data)
        }
        else if (response.status === 401) {
            noFoundPokemon();
        }

        else if (response.status === 404) {
            console.log("Informacion no encontrada")
        }

        else {
            console.log("Hubo un error y no se que paso")
        }
    } catch (err) {
        console.error()

    }

}
//Se crea una funcion para realizar la renderización de los elementos
const renderPokemon = (data) => {
    //Se realiza la desectructuracion de los valores de la respuesta de json
    const { id, name, height, stats, types } = data
    //Se llega a un arreglo de objetos atraves de sus propiedades
    const tipo = types[0].type.name
    //Se muestan los resultados
    const sprite = data.sprites.front_default
    document.getElementById("mostrarPokemon").innerHTML = name.toUpperCase()
    document.getElementById("tipo").innerHTML = `Tipo:${tipo.toUpperCase()}`
    document.getElementById("datosPokemon").innerText = `Numero de pokedex:${id}`
    document.getElementById("peso").innerText = `Peso:${height}`
    document.getElementById("stat").innerText = `Puntos de vida:${stats[0].base_stat}`

    pokeImg.setAttribute('src', sprite);
}
//Funcion en caso de no encontrar pokémon
function noFoundPokemon() {
    //Se restablecen los resultado al no encontrar datos
    document.getElementById("mostrarPokemon").innerText = "No se encontro ningun pokémon intenta de nuevo"
    document.getElementById("datosPokemon").innerText = ""
    document.getElementById("peso").innerText = ""
    document.getElementById("stat").innerText = ""
    let imagen = document.getElementById("poke-img")
    imagen.src = "./src/img/poke-shadow.png"
}

//Funcion que restaura los valores por defecto 
const restaValores = () => {
    document.getElementById("mostrarPokemon").innerText = ""
    document.getElementById("datosPokemon").innerText = ""
    document.getElementById("peso").innerText = ""
    document.getElementById("stat").innerText = ""
    document.getElementById("getPokemon").value = ""
    document.getElementById("tipo").innerHTML = ``
    let imagen = document.getElementById("poke-img")
    imagen.src = "./src/img/poke-shadow.png"
}


