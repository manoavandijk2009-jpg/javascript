async function zoekPokemon(naamOfId) {
    const box = document.querySelector('#box1');

    box.innerHTML = `<p style="text-align:center;">⏳ Loading...</p>`;

    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${naamOfId.toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Pokemon niet gevonden");
        }

        let data = await response.json();

        let normalSprite = data.sprites.front_default;
        let shinySprite = data.sprites.front_shiny;

        let types = data.types.map(t => t.type.name).join(", ");

        let statsHTML = data.stats.map(stat => {
            return `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
        }).join("");

        box.innerHTML = `
            <div style="text-align:center;">
                <h2>${data.name}</h2>
                <img id="pokemonImg" src="${normalSprite}" alt="${data.name}">
                
                <p><strong>Types:</strong> ${types}</p>

                <h3>Stats:</h3>
                <ul style="list-style:none; padding:0;">${statsHTML}</ul>

                <button id="toggleShiny">Shiny</button>
            </div>
        `;

        let shiny = false;
        document.querySelector('#toggleShiny').addEventListener('click', function () {
            let img = document.querySelector('#pokemonImg');
            shiny = !shiny;
            img.src = shiny ? shinySprite : normalSprite;
        });

    } catch (error) {
        box.innerHTML = `<p style="text-align:center;">Pokemon not found!</p>`;
        console.error(error);
    }
}

document.querySelector('#searchBtn').addEventListener('click', function() {
    let value = document.querySelector('#searchInput').value;
    zoekPokemon(value);
});

document.querySelector('#searchInput').addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        zoekPokemon(e.target.value);
    }
});
