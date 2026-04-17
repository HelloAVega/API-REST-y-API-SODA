// API URL base
const API_BASE_URL = 'https://restcountries.com/v3.1/name';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

// Función para buscar país
async function searchCountry() {
    const searchTerm = searchInput.value.trim();
    
    // Validar que haya texto
    if (!searchTerm) {
        errorDiv.textContent = 'Por favor escribe el nombre de un país';
        errorDiv.style.display = 'block';
        resultsDiv.innerHTML = '';
        return;
    }

    // Mostrar loading
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    resultsDiv.innerHTML = '';

    try {
        // Realizar consulta a la API
        const response = await fetch(`${API_BASE_URL}/${searchTerm}`);
        
        // Validar respuesta
        if (!response.ok) {
            throw new Error('País no encontrado');
        }

        // Convertir respuesta a JSON
        const data = await response.json();

        // Mostrar resultados
        displayResults(data);
        errorDiv.style.display = 'none';

    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
        resultsDiv.innerHTML = '';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Función para mostrar resultados
function displayResults(countries) {
    resultsDiv.innerHTML = '';

    countries.forEach(country => {
        // Extraer información relevante
        const name = country.name?.common || 'N/A';
        const official = country.name?.official || 'N/A';
        const capital = country.capital?.[0] || 'N/A';
        const flag = country.flags?.png || '';
        const region = country.region || 'N/A';
        const population = country.population?.toLocaleString() || 'N/A';
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        const area = country.area?.toLocaleString() || 'N/A';

        // Crear HTML para el resultado
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
            <div class="card-header">
                <img src="${flag}" alt="Bandera de ${name}" class="flag">
                <h2>${name}</h2>
            </div>
            <div class="card-body">
                <p><strong>Nombre Oficial:</strong> ${official}</p>
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Región:</strong> ${region}</p>
                <p><strong>Población:</strong> ${population}</p>
                <p><strong>Idiomas:</strong> ${languages}</p>
                <p><strong>Área:</strong> ${area} km²</p>
            </div>
        `;

        resultsDiv.appendChild(countryCard);
    });
}

// Event Listeners
searchBtn.addEventListener('click', searchCountry);

// Búsqueda al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCountry();
    }
});
