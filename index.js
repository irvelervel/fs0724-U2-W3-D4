// la pagina index sarà l'homepage della nostra webapp
// conterrà gli eventi attualmente in database, mostrandoli all'utente

// recuperiamo i concerti dalle API di EPICODE

const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

const getConcerts = function () {
  fetch(concertsURL)
    .then((response) => {
      console.log('RESPONSE', response)
      if (response.ok) {
        // se finiamo qui, va tutto bene!
        // proviamo ora ad estrarre il JSON dalla response
        return response.json()
      } else {
        // se finiamo qui, la risposta del server è stata es. 400, 401, 404, 500 etc.
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((data) => {
      // siamo finiti qui se prima eravamo nel response.ok e l'estrazione
      // del JSON ha avuto successo
      // qui otteniamo i concerti disponibili
      console.log('CONCERTI DISPONIBILI', data)
      // cicliamo l'array dei concerti e creiamo per ciascuno di essi
      // una col con dentro una card; le appenderemo nella row con id "events-row"
      createCardsFromConcerts(data)
    })
    .catch((err) => {
      // se finiamo qui, probabilmente abbiamo un problema di rete...
      console.log('ERRORE!', err)
    })
}

const createCardsFromConcerts = function (arrayOfConcerts) {
  // qui manipoliamo il dom a partire dall'array di concerti
  arrayOfConcerts.forEach((concert) => {
    const newCol = document.createElement('div') // <div></div>
    newCol.classList.add('col', 'col-12', 'col-md-4', 'col-lg-3')
    // <div class="col col-12 col-md-4 col-lg-3"></div>
    newCol.innerHTML = `
        <div class="card h-100">
            <img src="./assets/logo.jpg" class="card-img-top" alt="generic concert picture">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${concert.name}</h5>
                <p class="card-text flex-grow-1">${concert.description}</p>
                <p class="card-text">${new Date(concert.time).toLocaleString(
                  'it-IT'
                )} - ${concert.price}€</p>
                <a href="./details.html?concertId=${
                  concert._id
                }" class="btn btn-primary">VAI AI DETTAGLI</a>
            </div>
        </div>
        `
    const row = document.getElementById('events-row')
    row.appendChild(newCol)
  })
}

getConcerts()
