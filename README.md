# Proyectos de Consultas a APIs

Este repositorio contiene dos proyectos:
- **REST Countries**: Consultar información de países
- **API SODA Colombia**: Consultar datos de barrios de Barranquilla

---

## Proyecto 1: REST Countries

### Descripción
Buscador de países usando la API de REST Countries. Permite consultar información completa de cualquier país del mundo.

### Tecnologías
- HTML5
- CSS3
- JavaScript

### Cómo Usar
1. Abre `API REST/index.html`
2. Escribe el nombre de un país
3. Presiona "Buscar" o Enter
4. Visualiza la información

### API Utilizada
```
Endpoint: https://restcountries.com/v3.1/name/{nombre}

Ejemplo:
https://restcountries.com/v3.1/name/colombia
```

### Respuesta de Ejemplo
```json
[{
  "name": {
    "common": "Colombia",
    "official": "Republic of Colombia"
  },
  "capital": ["Bogotá"],
  "region": "Americas",
  "population": 52085168,
  "languages": {"spa": "Spanish"},
  "area": 1141748,
  "flags": {"png": "https://..."}
}]
```

### Código Principal
```javascript
// Consulta a la API
const response = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
const data = await response.json();

// Procesar datos
data.forEach(pais => {
    console.log(pais.name.common);
    console.log(pais.capital);
});
```

---

## Proyecto 2: API SODA Colombia

### Descripción
Explorador de barrios de Barranquilla usando el portal de Datos Abiertos de Colombia (SODA).

### Tecnologías
- HTML5
- CSS3
- JavaScript

### Cómo Usar
1. Abre `API SODA/index.html`
2. Los datos se cargan automáticamente
3. Usa "Búsqueda" para filtrar barrios
4. O usa "Cargar Todo" para recargar

### API Utilizada
```
Dataset: Mapa de Barrios de Barranquilla según el POT
Endpoint: https://www.datos.gov.co/resource/qui6-qeux.json

### Respuesta de Ejemplo
```json
[{
  "id": "0",
  "nombre": "LAS GRANJAS",
  "localidad": "Metropolitana",
  "pieza_urba": "Suroccidental 1",
  "the_geom": {
    "type": "MultiPolygon",
    "coordinates": [...]
  }
}]
```

### Código Principal
```javascript
// Consulta a la API SODA
const response = await fetch('https://www.datos.gov.co/resource/qui6-qeux.json?$limit=50000');
const data = await response.json();

// Filtrar localmente
const filtrados = data.filter(barrio => 
    barrio.nombre.toLowerCase().includes(busqueda)
);
```

---

## Conceptos Clave

### Fetch API
```javascript
// Sintaxis básica para GET
const response = await fetch(url);
const data = await response.json();
```

### Manejo de Errores
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la API');
    const data = await response.json();
} catch (error) {
    console.error('Error:', error.message);
}
```

### Filtrado de Arrays
```javascript
const resultados = data.filter(item => 
    item.nombre.toLowerCase().includes(termino)
);
```

### Manipulación del DOM
```javascript
const elemento = document.createElement('div');
elemento.innerHTML = '<p>Contenido</p>';
document.getElementById('contenedor').appendChild(elemento);
```