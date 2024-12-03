async function solarSystem() {
    // Requête de l'API
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
    // Attend la réponse et convertit les données en format JSON
    const data = await response.json()

    let isMoon = []
    const planets = document.getElementById("planet-container");

    // Parcourt tous les corps célestes disponibles dans les données récupérées
    for (let i = 0; i < data.bodies.length; i++) {
        // Récupère le nom, les lunes et la gravité du corps céleste actuel
            let nom = data.bodies[i].id
            let lunes = data.bodies[i].moons
            let gravite = data.bodies[i].gravity

        // Vérifie si le corps est une planète, s'il a des lunes et si la gravité est définie
            if (data.bodies[i].isPlanet && gravite) {

                // Si 'moons' est null ou vide, afficher "Pas de lunes"
                let moonNames = (lunes && Array.isArray(lunes) && lunes.length > 0)
                    ? lunes.slice(0, 10).map(lune => lune.moon).join(', ')
                    : 'Aucun satellite';

                // Ajoute les informations dans le tableau sous forme d'objet
                isMoon.push({
                    Nom: nom,
                    Lune: moonNames,
                    Gravité: gravite
                })
            }   
    }
    // Trie les planètes par ordre alphabétique en fonction de leur nom
    isMoon.sort((a, b) => a.Nom.localeCompare(b.Nom));
    //console.log(isMoon)

    // Affiche le nom des planètes dans le HTML
    isMoon.forEach(planet => {
        const planetDiv = document.createElement("div");
        planetDiv.textContent = planet.Nom;
        planetDiv.className = "planet-name";
    
        planetDiv.addEventListener("click", () => {
            displayPlanetDetails(planet); // Met à jour les détails
            moveCameraToPlanet(planet.Nom.toLowerCase()); // Déplace la caméra
        });
        planets.appendChild(planetDiv);
    });
}

// Fonction pour afficher les détails d'une planète
function displayPlanetDetails(planet){
    const planetDetail = document.getElementById("planet-detail");
    planetDetail.innerHTML = `
    <h2>${planet.Nom}</h2>
    <p><strong>Satellite : </strong>${planet.Lune}</p>
    <p><strong>Gravité : </strong>${planet.Gravité}</p>`
}

// Fonction qui permet de désactiver le suivi
function stopFollowingPlanet() {
    followingPlanet = null;
    resetCamera()
}

solarSystem()

document.getElementById("reset-camera").addEventListener("click", stopFollowingPlanet);

