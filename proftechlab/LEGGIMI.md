# Prof Tech Lab · Ecosistema

Sito statico: nessun server, nessun database, nessun account. Tutti i dati (progressi, mazzi, banca di classe, diari) restano nel browser di chi usa le app.

## Struttura
- `index.html` — la home (lavagna, Cassetta del docente, catalogo per grado e materia)
- `apps/` — tutte le app, lo stile comune (`ptl.css`) e l'accessibilità condivisa (`a11y.js`)

## Pubblicare su Netlify
Questa cartella va pubblicata così com'è: `index.html` deve stare nella radice del sito.
Non serve nessun comando di build.

## Aggiornare un'app
1. Sostituisci il file in `apps/` (o `index.html`).
2. Su GitHub: carica il file e fai Commit → Netlify ripubblica da solo in 1 minuto.
3. Con Netlify Drop: trascina di nuovo l'intera cartella nella pagina Deploys del sito.

## Da sapere
- Se cambi indirizzo del sito, gli utenti ritrovano i loro dati solo sullo stesso indirizzo e sullo stesso browser.
- Prima di cambi importanti, scarica una copia della cartella (backup).
