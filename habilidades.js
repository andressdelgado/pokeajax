/**
 * Clase que representa la aplicación para mostrar las habilidades de un Pokémon.
 * @class
 */
class HabilidadesApp {
  /**
       * Constructor de la clase HabilidadesApp.
       * Inicializa los elementos de la interfaz y agrega un event listener al botón de volver.
       * Obtiene los parámetros de consulta de la URL y muestra las habilidades del Pokémon.
       * @constructor
       */
  constructor () {
    /** @type {HTMLElement} */
    this.habilidadesElement = document.getElementById('habilidades')

    /** @type {HTMLButtonElement} */
    this.volverBtn = document.getElementById('volverBtn')

    // Agrega un event listener al botón de volver para llamar al método volverALista.
    this.volverBtn.addEventListener('click', () => this.volverALista())

    try {
      // Obtener parámetros de consulta de la URL
      const urlParams = new URLSearchParams(window.location.search)
      const name = urlParams.get('name')
      const image = urlParams.get('image')
      const abilities = JSON.parse(decodeURIComponent(urlParams.get('abilities')))

      // Mostrar las habilidades
      this.mostrarHabilidades({ name, image, abilities })
    } catch (error) {
      console.error(error)
      this.habilidadesElement.innerHTML = '<p>Error al cargar las habilidades del Pokémon.</p>'
    }
  }

  /**
       * Método para mostrar las habilidades de un Pokémon en el DOM.
       * @param {Object} data - Objeto que contiene la información del Pokémon (nombre, imagen y habilidades).
       */
  mostrarHabilidades (data) {
    const habilidades = data.abilities.map(ability => ability.ability.name)

    // Mostrar habilidades en el DOM
    this.habilidadesElement.innerHTML = `
                <h2>${data.name}</h2>
                <h3>Habilidades:</h3>
                <ul>
                    ${habilidades.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
            `
  }
}

// Crea una instancia de la clase HabilidadesApp al cargar la página.
const habilidadesApp = new HabilidadesApp()
