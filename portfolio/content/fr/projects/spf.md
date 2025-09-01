---
title: "Tableau de bord de suivi de la Covid-19"
client: "Administration d'État"
technologies: ["DigDash", "Unix", "JavaScript", "Embedded", "CSS"]
demoUrl: "https://www.santepubliquefrance.fr/dossiers/coronavirus-covid-19/coronavirus-chiffres-cles-et-evolution-de-la-covid-19-en-france-et-dans-le-monde"
githubUrl: "#"
---
## Résumé du Projet

Réalisé pendant mon travail chez DigDash, ce projet consistait à développer un tableau de bord embarqué qui offre des indicateurs clés mis à jour quotidiennement sur l'évolution de la COVID-19 en France et dans le monde. Il intègre des chiffres comme l'incidence, l'hospitalisation, la mortalité, la vaccination, les variants et le traçage des contacts, et permet le filtrage par région ou groupe d'âge via des cartes et graphiques interactifs. Il est embarqué sur le site web de l'agence française de santé publique (Santé Publique France).

## Réalisé dans ce projet

### Gestion des Données
- **Plusieurs sources de données** : inclusion de sources de données comme les API, fichiers Excel et CSV, bases de données SQL
- **Qualité des données** : application de règles de sélection et de transformation des données
- **Couche sémantique** : définition de la couche sémantique dans les modèles de données, incluant : la hiérarchisation des données, les formats, les objectifs, les traductions, etc.
- **Mesures calculées avancées** : mesures pour calculer des pourcentages de moyennes mobiles, prédiction, tendances, etc.

### Développement du Tableau de Bord
- **Responsive** : Tableau de bord disponible en mode bureau et en mode mobile
- **Traduit** : En anglais et en français
- **Design corporate** : Personnalisation des pages de tableau de bord pour s'intégrer parfaitement au site web de l'administration
- **Audience importante** : Plus de 80 000 connexions simultanées, donc une architecture spécifique a été implémentée pour supporter le gros volume de visites
- **Validation** : Protocoles de tests pour valider les tableaux de bord présentés

### Gestion de Projet
- **Suivi de la planification** : Réunions d'avancement avec les équipes du client, avec l'objectif de respecter la planification définie
- **Documentation** : Rapports de validation, d'usage, de documentation technique

### Rapports PDF Automatisés
- **Personnalisés** : Design aligné avec le site web et le tableau de bord
- **Cycle d'approbation** : pour que les équipes de l'Administration puissent valider le rapport avant sa diffusion
