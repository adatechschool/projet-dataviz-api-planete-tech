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
            showPlanetDetailsIn3D(planet); // Affiche les details dans le 3D

            // Scroll jusqu'à la section 3D
            const threeContainer = document.getElementById("three-container");
            if (threeContainer) {
                threeContainer.scrollIntoView({ behavior: "smooth", block: "start"});
            }
        });
        planets.appendChild(planetDiv);
    });
}

document.getElementById("planet-detail").classList.add("hidden")

// Fonction pour afficher les détails d'une planète
function displayPlanetDetails(planet){
    const planetDetail = document.getElementById("planet-detail");
    planetDetail.innerHTML = `
    <h2>${planet.Nom}</h2>
    <p><strong>Satellite : </strong>${planet.Lune}</p>
    <p><strong>Gravité : </strong>${planet.Gravité}</p>`
}

// Fonction pour afficher les details dans le 3D
function showPlanetDetailsIn3D(planet) {
    const infoPanel = document.getElementById("planet-info-3d");
    const nameElement = document.getElementById("planet-name-3d");
    const detailsElement = document.getElementById("planet-details-3d");

    // MAJ les details
    nameElement.textContent = planet.Nom;
    detailsElement.innerHTML = `
        <strong>Satellite :</strong> ${planet.Lune}<br>
        <strong>Gravité :</strong> ${planet.Gravité}
    `;

    // Afficher le panneau
    infoPanel.classList.remove("hidden");
}

// Masque le panneau lorsqu'on quitte une planète
function hidePlanetDetailsIn3D() {
    const infoPanel = document.getElementById("planet-info-3d");
    infoPanel.classList.add("hidden");
}

// Fonction qui permet de désactiver le suivi
function stopFollowingPlanet() {
    followingPlanet = null;
    resetCamera();
    hidePlanetDetailsIn3D();
}

solarSystem()

document.getElementById("reset-camera").addEventListener("click", stopFollowingPlanet);

