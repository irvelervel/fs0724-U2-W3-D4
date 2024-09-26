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
    })
    .catch((err) => {
      // se finiamo qui, probabilmente abbiamo un problema di rete...
      console.log('ERRORE!', err)
    })
}

getConcerts()
