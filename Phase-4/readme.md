# Sen Memory Game - Phase 4

## Phase 4 : Create a Timer

Cette phase ajoute un chronomètre au jeu Sen Memory Game.

## Objectif de la phase

L'objectif est de suivre la durée de la partie afin de donner au joueur une indication sur sa rapidité.

Le timer démarre lorsque le joueur clique pour la première fois sur une carte. Il continue pendant toute la partie et s'arrête automatiquement lorsque toutes les paires ont été trouvées.

## Fonctionnalités réalisées

- Ajout d'un chronomètre affiché à l'écran.
- Démarrage du timer au premier clic sur une carte.
- Mise à jour du temps chaque seconde.
- Arrêt du timer lorsque toutes les paires sont trouvées.
- Remise à zéro du timer avec le bouton Recommencer.
- Affichage du temps final dans le message de victoire.
- Maintien du système de mouvements, de score et de feedback.

## Technologies utilisées

- HTML
- CSS
- JavaScript
- Git
- GitHub Pages

## Logique du timer

Le timer est géré avec les fonctions JavaScript suivantes :

```javascript
startTimer()
stopTimer()
resetTimer()
updateTimerDisplay()