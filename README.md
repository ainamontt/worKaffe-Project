# WORKAFFE - ENCUENTRA TU ESPACIO IDEAL EN BARCELONA

WorKaffe es una aplicación web y móvil diseñada para conectar a trabajadores remotos con los mejores cafés de Barcelona, transformandolos en sus espacios de trabajo ideales.
Descubre, filtra establecimiento por barrios, disponibilidades de WiFi, enchufes, tipo de ambiente y más. Facilita la búsqueda de tu proxina oficina nómanda y tu proxiño lugar de networking.

# Screenshots

# Getting Started

Para poner en marcha WorKaffe en tu máquina, tanto 'client' como 'server' deben estar configurados. Sigue estos pasos para un despliegue completo del entorno de desarrollo.

Asegurate de tener instalado:
. Node.js (version recomendada: LTS)
. npm (viene con Node.js)
. Git
. MongoDB (Si quieres ejecutar la DB localmente)

1. Clonar los repositorios

# Para el frontend (este repositorio)

```terminal
git clone https://github.com/ainamontt/workaffe-client.git
cd workaffe-client
```

2. Configura el Backend (Servidor)
   cd ../workcaffe-server # Regresa al directorio principal y luego entra al
   npm install

Variable de entorno:
Crea un archivo (.env) en [workaffe/server/scripts] con las siguientes variables:

---

## MONGODB_URI=mongodb://localhost:27017/workaffe_db

// incompleto
