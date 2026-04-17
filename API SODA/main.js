// API URL - Datos de Barrios de Barranquilla
const API_URL = 'https://www.datos.gov.co/resource/qui6-qeux.json';

// Variables globales
let allData = [];

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadAllBtn = document.getElementById('loadAllBtn');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const statsDiv = document.getElementById('stats');

// Función para cargar todos los datos
async function loadAllData() {
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    resultsDiv.innerHTML = '';

    try {
        // Consultar API sin filtro (primeros 50,000 registros)
        const response = await fetch(`${API_URL}?$limit=50000`);
        
        if (!response.ok) {
            throw new Error('Error al cargar datos de la API');
        }

        allData = await response.json();

        if (allData.length === 0) {
            errorDiv.textContent = 'No se encontraron datos';
            errorDiv.style.display = 'block';
            return;
        }

        // Mostrar estadísticas
        displayStats();
        // Mostrar resultados
        displayResults(allData);
        errorDiv.style.display = 'none';

    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.style.display = 'block';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Función para buscar barrios
function searchBarrios() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        errorDiv.textContent = 'Por favor escribe un término de búsqueda';
        errorDiv.style.display = 'block';
        resultsDiv.innerHTML = '';
        return;
    }

    // Filtrar datos locales
    const filtered = allData.filter(barrio => {
        const nombre = (barrio.nombre || '').toLowerCase();
        const localidad = (barrio.localidad || '').toLowerCase();
        const id = (barrio.id || '').toLowerCase();
        
        return nombre.includes(searchTerm) || 
               localidad.includes(searchTerm) || 
               id.includes(searchTerm);
    });

    if (filtered.length === 0) {
        errorDiv.textContent = `No se encontraron barrios con "${searchTerm}"`;
        errorDiv.style.display = 'block';
        resultsDiv.innerHTML = '';
    } else {
        errorDiv.style.display = 'none';
        displayResults(filtered);
    }
}

// Función para mostrar estadísticas
function displayStats() {
    const totalBarrios = allData.length;
    const localidades = [...new Set(allData.map(b => b.localidad).filter(Boolean))];
    
    statsDiv.innerHTML = `
        <div class="stat-item">
            <strong>Total de Barrios:</strong> ${totalBarrios}
        </div>
        <div class="stat-item">
            <strong>Localidades:</strong> ${localidades.join(', ')}
        </div>
    `;
    statsDiv.style.display = 'block';
}

// Función para mostrar resultados
function displayResults(barrios) {
    resultsDiv.innerHTML = '';

    barrios.forEach((barrio, index) => {
        const id = barrio.id || 'N/A';
        const nombre = barrio.nombre || 'N/A';
        const localidad = barrio.localidad || 'N/A';
        const pieza_urba = barrio.pieza_urba || 'N/A';

        const card = document.createElement('div');
        card.className = 'barrio-card';
        card.innerHTML = `
            <div class="">#${index + 1}</div>
            <h3>${nombre}</h3>
            <div class="card-body">
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Localidad:</strong> ${localidad}</p>
                <p><strong>Pieza Urbana:</strong> ${pieza_urba}</p>
            </div>
        `;

        resultsDiv.appendChild(card);
    });
}

// Event Listeners
searchBtn.addEventListener('click', searchBarrios);
loadAllBtn.addEventListener('click', loadAllData);

// Búsqueda al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBarrios();
    }
});

// Cargar datos al iniciar
window.addEventListener('load', loadAllData);
