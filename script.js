/**
 * Clase que representa la aplicación para buscar Pokémon y mostrar habilidades.
 * @class
 */
class PokemonApp {
  /**
       * Constructor de la clase PokemonApp.
       * Inicializa los elementos de la interfaz y agrega un event listener al botón de búsqueda.
       * @constructor
       */
  constructor () {
    /** @type {HTMLInputElement} */
    this.pokemonInput = document.getElementById('pokemonInput')

    /** @type {HTMLButtonElement} */
    this.buscarBtn = document.getElementById('buscarBtn')

    /** @type {HTMLElement} */
    this.resultadoElement = document.getElementById('resultado')

    // Agrega un event listener al botón de búsqueda para llamar al método buscarPokemon.
    this.buscarBtn.addEventListener('click', () => this.buscarPokemon())
  }

  /**
       * Método asíncrono para buscar Pokémon utilizando la PokeAPI.
       * Filtra los resultados según el texto de búsqueda y muestra la información en el DOM.
       * @async
       * @returns {Promise<void>}
       */
  async buscarPokemon () {
    // Obtiene el texto de búsqueda en minúsculas.
    const textoBusqueda = this.pokemonInput.value.toLowerCase()

    try {
      // Obtiene información de todos los Pokémon desde la API.
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1000'
      const response = await fetch(url)

      // Maneja errores de la petición HTTP.
      if (!response.ok) {
        throw new Error(`No se pudo obtener la lista de Pokémon. Código de estado: ${response.status}`)
      }

      const data = await response.json()

      // Filtra los resultados según el texto de búsqueda.
      const resultados = data.results.filter(pokemon => pokemon.name.includes(textoBusqueda))

      if (resultados.length > 0) {
        // Obtiene información detallada de cada Pokémon.
        const pokemonDetailsPromises = resultados.map(pokemon => fetch(pokemon.url).then(response => response.json()))
        const pokemonDetails = await Promise.all(pokemonDetailsPromises)

        // Muestra resultados en el DOM.
        this.resultadoElement.innerHTML = pokemonDetails.map(infoData => `
                      <div>
                          <h2>${infoData.name}</h2>
                          <img src="${infoData.sprites.front_default}" alt="${infoData.name}">
                          <button onclick="pokemonApp.mostrarHabilidades('${encodeURIComponent(infoData.name)}', '${encodeURIComponent(infoData.sprites.front_default)}', '${encodeURIComponent(JSON.stringify(infoData.abilities))}')">Mostrar Habilidades</button>
                      </div>
                  `).join('')
      } else {
        this.resultadoElement.innerHTML = '<p>No se encontraron Pokémon.</p>'
      }
    } catch (error) {
      console.error(error)
      this.resultadoElement.innerHTML = '<p>Error al buscar Pokémon.</p>'
    }
  }

  /**
       * Método para mostrar las habilidades de un Pokémon.
       * Codifica los datos como parámetros de consulta en la URL y redirige a la página de habilidades.
       * @param {string} name - Nombre del Pokémon.
       * @param {string} image - URL de la imagen del Pokémon.
       * @param {string} abilities - Habilidades del Pokémon en formato JSON.
       */
  mostrarHabilidades (name, image, abilities) {
    const queryParams = new URLSearchParams()
    queryParams.append('name', name)
    queryParams.append('image', image)
    queryParams.append('abilities', abilities)

    // Redirige a la página de habilidades con los parámetros de consulta.
    window.location.href = `habilidades.html?${queryParams.toString()}`
  }
}

// Crea una instancia de la clase PokemonApp al cargar la página.
const pokemonApp = new PokemonApp()
