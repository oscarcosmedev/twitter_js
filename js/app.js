/**
 * Variables
 */

const formulario    = document.querySelector('#formulario')
const listaTweets   = document.querySelector('#lista-tweets')
const contenido     = document.querySelector('#contenido')

let tweets = []



/**
 * Listeners
 */

eventListeners()

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || []
        console.log(tweets)
        crearHTML()
    })
}



/**
 * Funciones
 */

function agregarTweet(e){
    e.preventDefault()
    const tweet = document.querySelector('#tweet').value

    if(tweet === '') {
        // console.log('No puede estar vacio')
        mostrarError('El tweet esta vacío')
        return
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir tweet al arreglo
    // console.log('agregando tweet')
    tweets = [...tweets, tweetObj]

    // Creamos el HTML
    crearHTML()

    // Reiniciar el Formulario
    formulario.reset()

}

function mostrarError(error) {
    const mensajeError = document.createElement('P')
    mensajeError.textContent = error
    mensajeError.classList.add('error')
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

function crearHTML() {

    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Creamos el HTML
            const li = document.createElement('li')
            li.textContent = tweet.tweet
            listaTweets.appendChild(li)

            // Crear btn eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList = 'borrar-tweet'
            btnEliminar.innerText = 'X'
            li.appendChild(btnEliminar)

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }
            
        })
    }

    sincronizarStorage()
}

// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id )
    crearHTML()
}

// Agrega los tweets actuales al LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}