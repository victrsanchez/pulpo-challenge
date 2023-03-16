# Pulpo challenge

Se necesita crear una API que obtenga de OpenAid la información de ayuda monetaria realizadas a cada país; 

esta información debe ser consultada por el código IATA de cada país y extraida de la API de OpenAid.

## Nota
No se logro encontrar la API  de OpenAid y se obto por obtener la información de archivos XML expuestos en el sitio de OpenAid especificamente en la siguiente url

```
https://iati.openaid.se/xml/
```

## Resultado

El resultado devuelvo por la API debe alinearse al siguiente formato ordenado por año de mayor a menor contribuyente:

```
{
    "2011": {
        "Sida": 181469583
    },
    "2010": {
        "Sida": 149667518,
        "UD": 6105000
        },
    "2009": {
        "Sida": 122295311,
        "UD": 30291000
    },
    "2008": {
        "Sida": 128969145,
        "UD": 33851000,
        "Folke Bernadotte Academy": 173000,
        "Svenska institutet": 125000
    },
    "2007": {
        "Sida": 101561481,
        "UD": 7399000,
        "Folke Bernadotte Academy": 6000
    }
}
```

# Solución planteada

## Arquitectura
Con el objetivo de crear una arquitectura limpia, escalable y de microservicios se propuso una arquitectura tipo hexagonal; a cotinuación se describe la estrucuta de archivos del proyecto:

```
├── src
│   ├── controllers ( Punto de entrada de las rutas donde se sanitiza y validad los datos de entrada y se administran las respuestas de cada ruta )
│   ├── services ( Directorio donde se encuentran todos los sevicios que proporcinan la logica de la aplicación )
│   ├── utils ( Dervicios utilidades que propocionan funcionalidades no especificas para la logica del proyecto )
│   ├── main.ts ( Punto inicial de la aplicación y donde se define la unica ruta del challenge )
├── dist (or build)
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```

# Instalación de la aplicación

```
npm install
```

# Ejecución
- Build
```
npm run build-ts
```

- running the app
```
npm run serve
```

- running tests
```
npm run test
```

- running dev
```
npm run dev
```


# Endpoint
- GET localhost:3000/aid-data

```
{
    "countryCode" : "iq"
}
```