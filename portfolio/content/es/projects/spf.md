---
title: "Dashboard de seguimiento de la Covid-19"
client: "Administración estatal"
technologies: ["DigDash", "Unix", "JavaScript", "Embedded", "CSS"]
demoUrl: "https://www.santepubliquefrance.fr/dossiers/coronavirus-covid-19/coronavirus-chiffres-cles-et-evolution-de-la-covid-19-en-france-et-dans-le-monde"
githubUrl: "#"
---
## Resumen del Proyecto

Realizado durante mi trabajo en DigDash, este proyecto consistió en desarrollar un dashboard embebido que ofrece indicadores clave actualizados diariamente sobre la evolución de la COVID-19 en Francia y en el mundo. Integra cifras como incidencia, hospitalización, mortalidad, vacunación, variantes y rastreo de contactos, y permite filtrado por región o grupo de edad mediante mapas y gráficos interactivos. Está abarcado en el sitio web de la agencia francesa de salud publica (Santé Publique France).


## Realizado en este proyecto

### Data Management
- **Varias fuentes de datos** : inclusión de fuentes de datos como API, archivos Excel y CSV, base de datos SQL
- **Calidad de los datos** : applicación de reglas de selección y de transformación de los datos
- **Capa sémantica** : definición de la capa sématica en los modelos de datos, incluyendo : la jerarquización de los datos, los formatos, los objetivos, las traducciónes, etc.
- **Medidas calculadas avanzadas** : medidas para calcular porcentages promedios moviles, predicción, tendencias, etc.


### Desarollo de cuadro de mandos
- **Responsive**: Cuadro de mandos disponible en modo escritorio y en modo móvil
- **Traducido**: En inglés y en francés
- **Diseño corporativo**: Personalización de las páginas de dashboard para encajar perfectamente con el sitio web de la administración
- **Audiencia importante** : Más de 80.000 connexiones simultaneadas, por lo que se implementó una architectura especifica para soportar el gran volumen de visitas.
- **Validación**: Protocolos de tests para validar los dashboards presentados

### Gestión de proyectos
- **Seguimiento de la planificación**: Reuniones de avance Con los équipos del cliente, con objetivo de respectar la planificación definida
- **Documentación**: Informes de validación, de uso, de documentación técnica.

### Reportes PDF automatizados
- **Customizados**: Diseño alineado con el sitio web y el dashboard
- **Ciclo de aprobación**: para que los equipos de la Administración puedan validar el reporte antes de su difucsión

