// Stockage des relations 
const planetData = {};
console.log(planetData)

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
            displayPlanetDetails(planet);
            moveCameraToPlanet(planet.Nom.toLowerCase());
        });
        planets.appendChild(planetDiv);
        
    })
}

// Fonction pour afficher les détails d'une planète
function displayPlanetDetails(planet){
    const planetDetail = document.getElementById("planet-detail");
    planetDetail.innerHTML = `
    <h2>${planet.Nom}</h2>
    <p><strong>Satellite : </strong>${planet.Lune}</p>
    <p><strong>Gravité : </strong>${planet.Gravité}</p>`
}
solarSystem()

// Fonction permattant de déplacer la caméra
function moveCameraToPlanet(planetName) {
    const targetMesh = planetData[planetName.toLowerCase()];
    if (targetMesh) {
        const duration = 2000;
        const startPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        const endPos = { x: targetMesh.position.x * 1.5, y: targetMesh.position.y + 5, z: targetMesh.position.z * 1.5 };

        let startTime = null;

        function animateCamera(time) {
            if (!startTime) startTime = time;
            const elapsedTime = time - startTime;

            const t = Math.min(elapsedTime / duration, 1);
            camera.position.x = startPos.x + (endPos.x - startPos.x) * t;
            camera.position.y = startPos.y + (endPos.y - startPos.y) * t;
            camera.position.z = startPos.z + (endPos.z - startPos.z) * t;

            if (t < 1) {
                requestAnimationFrame(animateCamera);
            } else {
                camera.lookAt(targetMesh.position); // Point de la caméra sur la planète
                controls.target.copy(targetMesh.position); // Déplace le contrôle de la caméra
            }
        }

        requestAnimationFrame(animateCamera);
    } else {
        console.warn(`Planète "${planetName}" introuvable dans le 3D.`);
    }
}

