// ______________________________
// ...arrivati a fine lezione...//
// la pagina backoffice servirà ora per 2 operazioni:
// - CREAZIONE CONCERTI (l'indirizzo NON ha il parametro concertId, faremo una POST)
// - MODIFICA CONCERTI (l'indirizzo HA il parametro concertId, faremo una PUT)

const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

const addressBarContent = new URLSearchParams(location.search)
const concertId = addressBarContent.get('concertId')
// concertId O è una stringa O è null

// se concertId esiste, dobbiamo utilizzarlo per RECUPERARE i dettagli di quel concerto
// con questi dettagli PRE-COMPILEREMO il form!

if (concertId) {
  // recupero i dati
  fetch(concertsURL + '/' + concertId) // una GET molto specifica
    .then((response) => {
      if (response.ok) {
        // 200!
        return response.json()
      } else {
        throw new Error('Errore nel recupero del concerto da modificare')
      }
    })
    .then((singleConcert) => {
      // pre-compilo i campi del form con i valori del concerto da modificare
      const nameInput = document.getElementById('name')
      const descriptionInput = document.getElementById('description')
      const priceInput = document.getElementById('price')
      const timeInput = document.getElementById('time')

      // forzo un nuovo valore in ogni campo
      nameInput.value = singleConcert.name
      descriptionInput.value = singleConcert.description
      priceInput.value = singleConcert.price
      timeInput.value = singleConcert.time.split('.000Z')[0] // tagliato fuori lo ".000Z"

      // modifichiamo la LABEL del pulsante
      document.getElementsByClassName('btn-primary')[0].innerText =
        'MODIFICA CONCERTO'
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
}

// ______________________________ INIZIO LEZIONE

// in questa pagina è presente un form che servirà a creare nuovi concerti!
// un oggetto "concerto" è fatto così: (attenzione a non fare typos o errori)

// creiamo una classe Concert al fine di generare correttamente degli oggetti di tipo Concert
class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

// "name" -> string
// "description" -> string
// "price" -> string | number
// "time" -> string

// intervengo sull'evento di submit del form "concert-form"
const concertForm = document.getElementById('concert-form')
concertForm.addEventListener('submit', function (e) {
  e.preventDefault()
  // raccogliamo i campi del form
  const name = document.getElementById('name').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const time = document.getElementById('time').value
  // creo un oggetto di tipo Concert
  const c = new Concert(name, description, price, time)
  console.log('CONCERTO CREATO DAL FORM', c)

  // dati del concerto raccolti correttamente!
  // ora contattiamo le API per salvarlo in modo persistente nel database

  // GET
  // POST -> crea un nuovo elemento
  // PUT
  // DELETE

  // se le API con cui state interagendo sono del tipo "REST"
  // potete dedurre che:
  // - l'indirizzo per una chiamata con metodo POST è lo stesso di una chiamata
  // con metodo GET

  let methodToUse
  if (concertId) {
    methodToUse = 'PUT'
  } else {
    methodToUse = 'POST'
  }

  let addressToUse
  if (concertId) {
    addressToUse = concertsURL + '/' + concertId
  } else {
    addressToUse = concertsURL
  }

  fetch(addressToUse, {
    //   fetch(concertId ? concertsURL + '/' + concertId : concertsURL, {
    // questo secondo parametro è SEMPRE un oggetto
    // con le chiamate POST ci va SEMPRE un "body"
    method: methodToUse,
    // method: concertId ? 'PUT' : 'POST',
    body: JSON.stringify(c), // il body è SEMPRE una stringa!
    headers: {
      // headers è SEMPRE un oggetto
      'Content-type': 'application/json', // dobbiamo informare le API che
      // il nostro body è in formato JSON
      // Authorization: 'BQ5J0xUI1cRSwGLF30de3ndtupKdYr4UstZ8wCjn2p9yW9oGoKuzTgnz'
      // per l'esercizio del pomeriggio
    },
  })
    .then((response) => {
      if (response.ok) {
        // 200, 201
        // l'evento è stato salvato!
        // non mi interessa particolarmente proseguire con response.json()
        // perchè tanto questa risposta conterrebbe lo stesso concerto che ho
        // appena creato... :)
        alert(concertId ? 'Evento modificato' : 'Evento salvato!')
        if (!concertId) {
          // SIAMO IN POST
          concertForm.reset() // svuoto i campi del form
        }
      } else {
        throw new Error('Errore nella risposta')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
})
