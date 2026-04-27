/* ==================================================
   SCRIPT.JS
   Gestisce:
   1) Validazione form
   2) Carosello recensioni automatico
   3) Dark mode con salvataggio preferenza
   ================================================== */

/* ==============================
   1) FORM CONTATTO
   ============================== */
const form = document.querySelector('form');
const statusText = document.getElementById('status');

if(form){
  form.addEventListener('submit', (event) => {
    // Se il form non è valido blocca invio
    if(!form.checkValidity()){
      event.preventDefault();
      statusText.textContent = 'Controlla i campi obbligatori.';
      return;
    }

    // Feedback utente durante invio
    statusText.textContent = 'Invio in corso...';
  });
}

/* ==============================
   2) RECENSIONI DINAMICHE
   Modifica array per cambiare testi
   ============================== */
const reviews = [
  {
    name:'Maria R.',
    text:'Sono arrivati rapidamente e hanno risolto una perdita che andava avanti da giorni.'
  },
  {
    name:'Luca P.',
    text:'Comunicazione chiara, prezzo corretto e lavoro pulito.'
  },
  {
    name:'Anna T.',
    text:'Finalmente un professionista che spiega cosa fa e lo fa bene.'
  },
  {
    name:'Davide S.',
    text:'Intervento preciso, nessuna sorpresa e massima puntualità.'
  }
];

const track = document.getElementById('track');

if(track){
  // Genera HTML automaticamente da array
  track.innerHTML = reviews.map(review => `
    <div class="slide">
      <div>
        <strong>${review.name}</strong>
        <p class="muted">${review.text}</p>
      </div>
    </div>
  `).join('');

  // Loop infinito carosello
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % reviews.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 3500);
}

/* ==============================
   3) DARK MODE
   Salva preferenza nel browser
   ============================== */
const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');

// Ripristina tema salvato
if(localStorage.getItem('theme') === 'dark'){
  root.classList.add('dark');
}

if(themeButton){
  themeButton.addEventListener('click', () => {
    root.classList.toggle('dark');

    // Salvataggio stato
    const mode = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  });
}
