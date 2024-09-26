const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// siamo arrivati alla pagina di dettaglio con nell'URL l'_id del concerto da mostrare
// recuperiamo l'_id dalla barra degli indirizzi e utilizziamolo per ottenere
// dalle API quel concerto specifico

const addressBarContent = new URLSearchParams(location.search)
// ho generato un oggetto con tutti i parametri dentro

const concertId = addressBarContent.get('concertId') // recupera l'_id dalla barra degli indirizzi
console.log("ECCO L'_ID RECUPERATO", concertId)

const getSingleConcert = function () {
  // ora utilizzo questo _id per fare una fetch MOLTO SPECIFICA!
  fetch(concertsURL + '/' + concertId) // https://striveschool-api.herokuapp.com/api/agenda/66f51e13210c220015b841d1
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('errore nel recupero del singolo concerto')
      }
    })
    .then((singleConcert) => {
      console.log('SINGLECONCERT', singleConcert)
      createDetailsCard(singleConcert)
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

const createDetailsCard = function (concertDetails) {
  const row = document.getElementById('details-row')
  const newCol = document.createElement('div') // <div></div>
  newCol.classList.add('col', 'col-12', 'col-md-6')
  newCol.innerHTML = `
        <div class="card text-center">
            <img src="./assets/logo.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${concertDetails.name}</h5>
                <p class="card-text">${concertDetails.description}</p>
                <p class="card-text">${new Date(
                  concertDetails.time
                ).toLocaleString('it-IT')} - ${concertDetails.price}€</p>
                <a href="./index.html" class="btn btn-primary">Torna in Home</a>
                <button onclick="deleteEvent()" class="btn btn-danger">ELIMINA CONCERTO</button>
                <a href="./backoffice.html?concertId=${
                  concertDetails._id
                }" class="btn btn-warning">MODIFICA CONCERTO</a>
            </div>
        </div>
    `
  row.appendChild(newCol)
}

const deleteEvent = function () {
  // questa funzione farà una chiamata fetch con il metodo DELETE, per ELIMINARE
  // un evento specifico
  fetch(concertsURL + '/' + concertId, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // l'elemento è stato cancellato
        alert('concerto eliminato')
        location.assign('./index.html')
      } else {
        throw new Error("Errore nella cancellazione dell'elemento")
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getSingleConcert()

// una GET su es. https://striveschool-api.herokuapp.com/api/agenda/66f51e13210c220015b841d1
// NON TORNA un array di concerti! torna un OGGETTO con UN SOLO CONCERTO

// GET funziona sia su indirizzo generico (/agenda) sia su uno specifico (/agenda/id)
// POST funziona SOLO sull'indirizzo generico (/agenda)
// DELETE funziona SOLO sull'indirizzo specifico (/agenda/id)
// PUT funziona SOLO sull'indirizzo specifico (/agenda/id)
