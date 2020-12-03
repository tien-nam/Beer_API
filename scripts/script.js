const baseAPI = "https://api.punkapi.com/v2/beers";
const content = document.querySelector('.contents');
let page = 1;
const prevPage = document.querySelector('#prev')
const nextPage = document.querySelector('#next')
const pageText = document.querySelector('#page_id')
const genericIMG = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';
/*
 ABV : 
    - All   : ""
    - Low   : "abv_lt=4.6"
    - Medium: "abv_gt=4.5&abv_lt=7.6"
    - HIGH  : "abv_gt=7.5"

IBU : 
    - All   : ""
    - Low   : "ibu_lt=35"
    - Medium: "ibu_gt=34&ibu_lt=75"
    - HIGH  : "ibu_gt=74"

pH :
    - All 
*/

const values = {
    abv: {
        all   : "",
        low   : "abv_lt=4.6",
        medium: "abv_gt=4.5&abv_lt=7.6",
        high  : "abv_gt=7.5"
    },
    ibu: {
        all   : "",
        low   : "ibu_lt=35",
        medium: "ibu_gt=34&ibu_lt=75",
        high  : "ibu_gt=74"
    },
    ph: {
        all: "",
        low : 'ph_lt=5',
        medium : 'ph_gt=4.9&ph_lt=5.7',
        high : "ph_gt=5.6"
    }
}

console.log(values.abv.medium)
//let ssss = urlAPI + "?ibu_lt=35"

//console.log(ssss)
const abv = document.querySelector('#filter-ABV');
let abv_query = "";

const ibu = document.querySelector('#filter-IBU');
let ibu_query = "";

const ph = document.querySelector('#filter-PH');
let ph_query = "";

abv.addEventListener('change',e => {
    abv_query = `${values.abv[e.target.value]}`
    getData();
})

ibu.addEventListener('change',e => {
    ibu_query = `${values.ibu[e.target.value]}`
    getData();
})

ph.addEventListener('change',e => {
    ph_query = `${values.ph[e.target.value]}`
    getData();
})

console.log({abv, ibu,ph})

getData();
async function getData() { 
    const url = `${baseAPI}?page=${page}${abv_query}&${ibu_query}&${ph_query}`

   // console.log(url.length)
    // fetch
    const beerPromise = await fetch(url);

    const beers = await beerPromise.json();

    console.log(beers.length)
 // pagination
 pageText.innerText = page;
    
 if(page === 1) {
     prevPage.disabled = true;
 } else {
     prevPage.disabled = false;
 }
 if(beers.length < 25) {
     nextPage.disabled = true;
 } else {
     nextPage.disabled = false;
 }
 

    content.innerHTML = ''
    beers.forEach(b => {
        content.innerHTML += `
        <div class="beer-card">
        <div class="beer-card--inner">
            <div class="beer-card--front">
                
                <img class="beer__img" src=${b.image_url ? b.image_url : genericIMG}>
                <h3 class="beer__name">${b.name}</h3>
                <p class="beer__tagline"> ${b.tagline} </p>
                <p class="beer__info bottom">
                    <span><strong>ABV</strong>: ${b.abv}%</span>
                    <span id="ibu"><strong>IBU</strong>: ${b.ibu}</span>
                    <span><strong>pH</strong>: ${b.ph}</span>
                </p>
            </div>

            <div class="beer-card--back">
                <h3 class="beer__title">${b.name}</h3>
                <p class="beer__desc">${b.description}</p>
                <p class="beer__food bottom">
                <strong>Food-Pairing :</strong> 
                <em>${b.food_pairing.join(', ')}</em>
                </p>
            </div>
        </div>
    </div>
        `;
    })
}
   // console.log(beers

   document.querySelector('#prev').addEventListener('click', e => {
       page--;
      getData();
   })

   document.querySelector('#next').addEventListener('click', e => {
    page++;
    getData();
})