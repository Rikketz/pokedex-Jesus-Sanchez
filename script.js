


// FUNCIONA, NO TOCAR
// AQUI ESTOY RECOGIENDO TODOS LOS DATOS DE LOS 150 POKEMONS
let getPokemonInfo = async()=>{
    let todosPokemon = [];
    for (let i = 1; i <= 150; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    const resultado = await response.json()
    todosPokemon.push(resultado);
    }
    return todosPokemon
}

// FUNCIONA, NO TOCAR
// AQUI VOY A MAPEAR LOS DATOS QUE NECESITO PARA QUE LUEGO SEA MAS FACIL DIBUJARLO
let mapPokemons = (mapeadoPokemons) => {
    return mapeadoPokemons.map((pokemon) =>
    ({
    nombre: pokemon.name,
    // imagen: pokemon.sprites.front_default,
    imagen:pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default,
    id: pokemon.id,
    tipo: pokemon.types[0].type.name,
    fotoGrande: pokemon.sprites.other["official-artwork"].front_default,
    altura: pokemon.height,
    peso: pokemon.weight,
    vida: pokemon.stats[0].base_stat,
    ataque: pokemon.stats[1].base_stat,
    defensa: pokemon.stats[2].base_stat,
    velocidad: pokemon.stats[3].base_stat,
    }))
}


// FUNCIONA, NO TOCAR
// AQUI VOY A DIBUJAR LOS POKEMON SEGUN LO QUE NECESITE
let drawPokemons = (mappedPokemons) =>{
    let listaPokemon$$ = document.querySelector(".container");
    listaPokemon$$.innerHTML = "";
    for (const pokemon of mappedPokemons) {
        const pokemonDiv$$ = document.createElement('div');
        pokemonDiv$$.className = "cajaCadaPokemon ";
        pokemonDiv$$.innerHTML = `
        <img class="pokeSprite" src="${pokemon.imagen}" alt="${pokemon.nombre}">
        <div class="textoCajitas">
        <p class="numeroIdCartitas">id: ${pokemon.id}</p>
        <p class="nombrePokeCartitas">${pokemon.nombre}</p>
        <div class="${pokemon.tipo}"></div>
        </div>`
        listaPokemon$$.appendChild(pokemonDiv$$);
        
        // PRUEBAS DE QUE OCURRE AL HACER CLICK EN CADA POKEMON
        pokemonDiv$$.addEventListener('click', function(){
            let divInfoPokemon$$ = document.createElement('div');
            listaPokemon$$.appendChild(divInfoPokemon$$);
            divInfoPokemon$$.className = "cajaInfoPokemon";

            let divInternoFotoTextos = document.createElement('div');
            divInternoFotoTextos.className = "internoFotosTextos";


            let divInternoSoloFoto = document.createElement('div')
            divInternoSoloFoto.className = "internoSoloFoto";

            let divInternoTexto = document.createElement('div');
            divInternoTexto.className = "internoTexto";


            let fotoGrande = document.createElement('img');
            fotoGrande.src = pokemon.fotoGrande;
            fotoGrande.className = "pokeFotoGrande";
            divInternoSoloFoto.appendChild(fotoGrande);


            let divInternoSoloTexto = document.createElement('div');
            divInternoSoloTexto.className = "internoSoloTexto";
            divInternoTexto.innerHTML= `
            <h2>Name: \n${pokemon.nombre}</h2>
            <h2>Type: \n${pokemon.tipo}</h2>
            <h3>Height: ${pokemon.altura * 30.48 / 2} cm</h3>
            <h3>Weight: ${pokemon.peso * 0.45} Kilos</h3>
            <h3>Health Points: ${pokemon.vida}</h3>
            <h3>Attack: ${pokemon.ataque}</h3>
            <h3>Defense: ${pokemon.defensa}</h3>
            <h3>Speed: ${pokemon.velocidad}</h3>
            `





            divInternoFotoTextos.appendChild(divInternoSoloFoto);
            divInternoFotoTextos.appendChild(divInternoTexto);
            divInfoPokemon$$.appendChild(divInternoFotoTextos);

            // AL HACER CLICK BORRO LA CAJA CON LA INFO
            divInfoPokemon$$.addEventListener('click', function(){
                listaPokemon$$.removeChild(divInfoPokemon$$);

            })
        })
    }
};

// FUNCIONA, NO TOCAR
let drawInput = (mappedPokemons) =>{
    const input$$ = document.querySelector('input');
    const inputValue = input$$.value.toString();
    input$$.addEventListener('input', () =>
    searchPokemons(input$$.value, mappedPokemons));
    console.log(searchPokemons(input$$, mappedPokemons));
}

// FUNCIONA, NO TOCAR
let searchPokemons = (filtro, pokemons) => {
    let filteredPokemons = pokemons.filter((pokemon) => pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    console.log(filteredPokemons);
    drawPokemons(filteredPokemons);
}







// ENTORNO DE PRUEBAS








let nameUser = prompt('What is your name?');
console.log(nameUser);
alert(nameUser);
let genderUser = prompt('Are you a male(M) or a female(F)?');
alert(genderUser)
let siUserM = './assets/hero.png'
let siUserF = './assets/heroine.png'


let divFotoTrainer$$ = document.querySelector('.fotoTrainer');
let fotoTrainer$$ = document.createElement('img');
fotoTrainer$$.className = "imagenEntrenador"
if (genderUser == 'M') {
    genderUser = 'Male'
    fotoTrainer$$.src = siUserM;
} else if (genderUser == 'F'){
    genderUser = 'Female'
    fotoTrainer$$.src = siUserF;
}
divFotoTrainer$$.appendChild(fotoTrainer$$);
let randomTrainerNumber = Math.floor(Math.random() * 99999);

divTrainerInfo$$ = document.querySelector('.infoTrainer');
divTrainerInfo$$.innerHTML = `
<h3>Name: ${nameUser}</h3>
<h3>Gender: ${genderUser}</h3>
<h3>Trainer No: ${randomTrainerNumber}</h3>
<programmer>Description: A young programmer that wants to keep improving in order to be the best Full Stack Developer.</p>
`









// FIN ENTORNO DE PRUEBAS


const init = async function(){

    const pokemons = await getPokemonInfo();
    const mappedPokemons = mapPokemons(pokemons);

    let btnAgua = document.querySelector('.tipoAgua');
btnAgua.addEventListener('click', function(){
    let pokemonAgua = mappedPokemons.filter(pokemon => pokemon.tipo == 'water');
    drawPokemons(pokemonAgua);
})
let btnDragon = document.querySelector('.tipoDragon');
btnDragon.addEventListener('click', function(){
    let pokemonVeneno = mappedPokemons.filter(pokemon => pokemon.tipo === 'dragon');
    drawPokemons(pokemonVeneno)
})
let btnFairy = document.querySelector('.tipoHada');
btnFairy.addEventListener('click', function(){
    let pokemonVeneno = mappedPokemons.filter(pokemon => pokemon.tipo === 'fairy');
    drawPokemons(pokemonVeneno)
})
let btnGhost = document.querySelector('.tipoFantasma');
btnGhost.addEventListener('click', function(){
    let pokemonGhost = mappedPokemons.filter(pokemon => pokemon.tipo === 'ghost');
    drawPokemons(pokemonGhost)
})
let btnFight = document.querySelector('.tipoLucha');
btnFight.addEventListener('click', function(){
    let pokemonLucha = mappedPokemons.filter(pokemon => pokemon.tipo === 'fighting');
    drawPokemons(pokemonLucha)
})
let btnVeneno = document.querySelector('.tipoVeneno');
btnVeneno.addEventListener('click', function(){
    let pokemonVeneno = mappedPokemons.filter(pokemon => pokemon.tipo === 'poison');
    drawPokemons(pokemonVeneno)
})
let btnFire = document.querySelector('.tipoFuego');
btnFire.addEventListener('click', function(){
    let pokemonFuego = mappedPokemons.filter(pokemon => pokemon.tipo === 'fire');
    drawPokemons(pokemonFuego)
})
let btnIce = document.querySelector('.tipoHielo');
btnIce.addEventListener('click', function(){
    let pokemonHielo = mappedPokemons.filter(pokemon => pokemon.tipo === 'ice');
    drawPokemons(pokemonHielo)
})
let btnGrass = document.querySelector('.tipoPlanta');
btnGrass.addEventListener('click', function(){
    let pokemonPlanta = mappedPokemons.filter(pokemon => pokemon.tipo === 'grass');
    drawPokemons(pokemonPlanta)
})
let btnBug = document.querySelector('.tipoBicho');
btnBug.addEventListener('click', function(){
    let pokemonBicho = mappedPokemons.filter(pokemon => pokemon.tipo === 'bug');
    drawPokemons(pokemonBicho)
})
let btnNormal = document.querySelector('.tipoNormal');
btnNormal.addEventListener('click', function(){
    let pokemonNormal = mappedPokemons.filter(pokemon => pokemon.tipo === 'normal');
    drawPokemons(pokemonNormal)
})
let btnElectrico = document.querySelector('.tipoElectrico');
btnElectrico.addEventListener('click', function(){
    let pokemonElectrico = mappedPokemons.filter(pokemon => pokemon.tipo === 'electric');
    drawPokemons(pokemonElectrico)
})
let btnTierra = document.querySelector('.tipoTierra');
btnTierra.addEventListener('click', function(){
    let pokemonTierra = mappedPokemons.filter(pokemon => pokemon.tipo === 'ground');
    drawPokemons(pokemonTierra)
})
let btnRock = document.querySelector('.tipoRoca');
btnRock.addEventListener('click', function(){
    let pokemonRoca = mappedPokemons.filter(pokemon => pokemon.tipo === 'rock');
    drawPokemons(pokemonRoca)
})
let btnAll = document.querySelector('.tipoTodos');
btnAll.addEventListener('click', function(){
    let pokemonTodos = mappedPokemons
    drawPokemons(pokemonTodos)
});





    drawPokemons(mappedPokemons);

    drawInput(mappedPokemons);






}

init();