const base_url:string = 'https://pokeapi.co/api/v2/';
class pokeapi{
    getIcon(pokemon) {  
        return fetch(pokemon.url)
        .then((response) => response.json)
        .then((poke) => poke.stats)
        .catch((error) => console.error("Error: Erro inesperado " + error))
    }
    pokedex(){
        return fetch(`${base_url}pokemon?limit=60&offset=60`)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((results) => results.map())
        .then((dataRequests) => Promise.all(dataRequests))
        .then((dataConclusion) => console.log(dataConclusion));
    }
}

console.log();