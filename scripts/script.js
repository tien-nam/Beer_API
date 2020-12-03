const urlAPI = "https://api.punkapi.com/v2/beers";
const content = document.querySelector('.contents');
getData();

async function getData() { // fetch
    const beerPromise = await fetch(urlAPI);
    const beers = await beerPromise.json();

    console.log(beers[0])
    beers.forEach(b => {
        content.innerHTML += `
        <div class="beer-card">
        <div class="beer-card--inner">
            <div class="beer-card--front">
                
                <img class="beer__img" src=${b.image_url}>
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

    console.log(beers)
}
