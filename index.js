const root = document.getElementById('root');

const yearSelect = document.getElementById('years');
yearSelect.addEventListener('change', (e) => {
    let year = e.target.value;
    getImage(year);
    localStorage.setItem('year', year);
});

for (let i = 2020; i >= 1996; i--) {
    let yearOpt = document.createElement('option');
    yearOpt.value = i;
    yearOpt.textContent = i;
    yearSelect.appendChild(yearOpt);
}

const apodImage = document.getElementById('image');
const apodLink = document.getElementById('link');
const apodDescription = document.getElementById('desc');

async function getImage(year) {
    let response = await fetch(`https://deo-tvog-univerzuma.netlify.app/.netlify/functions/service?year=${year}`);
    let data = await response.json();

    if (data.code) {
        apodDescription.innerHTML = 'Nije moguće trenutno dobiti sliku. Probaj da osvežiš stranicu.';

    } else {
        apodImage.src = data.url;
        apodLink.href = data.url;
        apodDescription.innerHTML = data.explanation;
        apodLink.download = `04.09.${year}`;
    }
}

let savedYear = localStorage.getItem('year');
if (savedYear) {
    getImage(savedYear);
    yearSelect.value = savedYear;
} else {
    getImage(yearSelect.value);
}
