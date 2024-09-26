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

  const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
  fetch(concertsURL, {
    // questo secondo parametro è SEMPRE un oggetto
    // con le chiamate POST ci va SEMPRE un "body"
    method: 'POST',
    body: JSON.stringify(c), // il body è SEMPRE una stringa!
    headers: {
      // headers è SEMPRE un oggetto
      'Content-type': 'application/json', // dobbiamo informare le API che
      // il nostro body è in formato JSON
    },
  })
    .then((response) => {
      if (response.ok) {
        // 200, 201
        // l'evento è stato salvato!
        // non mi interessa particolarmente proseguire con response.json()
        // perchè tanto questa risposta conterrebbe lo stesso concerto che ho
        // appena creato... :)
        alert('Evento salvato!')
        concertForm.reset() // svuoto i campi del form
      } else {
        throw new Error('Errore nella risposta')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
})
