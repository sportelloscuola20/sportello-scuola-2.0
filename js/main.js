
// Categorie menu
const CATEGORIE = [
  {slug:'cronaca', label:'Cronaca'},
  {slug:'docenti', label:'Docenti'},
  {slug:'studenti', label:'Studenti'},
  {slug:'pensioni', label:'Pensioni'},
  {slug:'diventare-insegnanti', label:'Diventare Insegnanti'},
  {slug:'ata', label:'ATA'},
  {slug:'dsga', label:'DSGA'},
  {slug:'personale-educativo', label:'Personale educativo'},
  {slug:'genitori', label:'Genitori'},
  {slug:'politica-scolastica', label:'Politica scolastica'},
  {slug:'lettere-in-redazione', label:'Lettere in redazione'},
  {slug:'scuole-non-statali', label:'Scuole non statali'},
  {slug:'guide', label:'Guide'},
  {slug:'scadenze-ed-eventi', label:'Scadenze ed eventi'}
];

function buildNewsMenu(){
  const menu = document.getElementById('newsMenu');
  if(!menu) return;
  CATEGORIE.forEach(c => {
    const a = document.createElement('a');
    a.href = `notizie.html?categoria=${encodeURIComponent(c.slug)}`;
    a.textContent = c.label;
    menu.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded', buildNewsMenu);
