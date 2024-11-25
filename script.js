// Fonction asynchrone pour récupérer les données depuis planets.json
async function fetchPlanetData() {
    try {
      // Utiliser fetch pour obtenir le fichier JSON
      const response = await fetch('data/planets.json');
      
      // Vérifier si la réponse est correcte (code 200)
      if (!response.ok) {
        throw new Error('Erreur de chargement du fichier JSON');
      }
  
      // Convertir la réponse en JSON
      const data = await response.json();
  
      // Afficher les données dans la console
      console.log(data);
  
      // Appeler une fonction pour afficher ces données sur le site
      displayPlanetData(data.planets);
  
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
  
  // Exemple de fonction pour afficher les données sur la page
  function displayPlanetData(planets) {
    const container = document.getElementById('planet-container');
  
    planets.forEach(planet => {
      const planetElement = document.createElement('div');
      planetElement.classList.add('planet');
      
      planetElement.innerHTML = `
        <h2>${planet.name}</h2>
        <p>Température: ${planet.temperature}</p>
        <p>Est-ce une géante gazeuse? ${planet.isGasGiant ? 'Oui' : 'Non'}</p>
        <p>Moons: ${planet.hasMoons ? 'Oui' : 'Non'}</p>
        <p>Vitesse orbitale: ${planet.orbitalSpeed}</p>
        <p>Vitesse de rotation: ${planet.rotationSpeed}</p>
        <p>Taille: ${planet.size}</p>
      `;
      
      container.appendChild(planetElement);
    });
  }
  
  // Appeler la fonction pour récupérer et afficher les données
  fetchPlanetData();
  