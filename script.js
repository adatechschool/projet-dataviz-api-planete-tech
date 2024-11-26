const apiUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';

async function fetchPlanetData() {
    try {
        // Récupérer les données de l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filtrer uniquement les planètes
        const planets = data.bodies.filter(function (body) {
            return body.isPlanet;
        });

        // Extraire et trier les informations des lunes pour chaque planète
        const planetsWithMoons = planets.map(function (planet) {
            let sortedMoons = []; // initier un tableau vide

            // Vérifier si la planète a des lunes
            if (planet.moons) {
                // Extraire les noms des lunes
                sortedMoons = planet.moons.map(function (moon) {
                    return moon.moon;
                });

                // Trier les noms des lunes par ordre alphabétique
                sortedMoons.sort(function (a, b) {
                    return a.localeCompare(b);
                });
            }

            console.log(planet)

            // Retourner un objet avec toutes les informations
            return {
                id: planet.id,
                name: planet.englishName,
                moons: sortedMoons,
                gravity: planet.gravity,
            };
        });

        // Trier les planètes par nom
        const sortedByName = planetsWithMoons.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        // Afficher les résultats triés
        sortedByName.forEach(function (planet) {
            console.log(`Planète: ${planet.name}`);
            console.log(`  Lunes: ${planet.moons.join(', ') || 'Aucune'}`);
            console.log(`  Gravité: ${planet.gravity}`);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Appeler la fonction
fetchPlanetData();
