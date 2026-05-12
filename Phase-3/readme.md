# Sen Memory Game - Phase 3

## Phase 3 : Scoring System

Cette phase ajoute un système de score au jeu Sen Memory Game.

## Objectif de la phase

L'objectif est de fournir un retour au joueur sur sa performance pendant la partie.

Le joueur peut voir le nombre de mouvements réalisés, son score et un feedback lui permettant d'améliorer sa performance.

## Fonctionnalités réalisées

- Ajout d'un compteur de mouvements.
- Affichage du nombre de mouvements à l'écran.
- Ajout d'un score initial de 100 points.
- Mise à jour du score en fonction de la progression du joueur.
- Réduction du score lorsque le nombre de mouvements augmente.
- Affichage d'un feedback selon la performance du joueur.
- Message final avec le nombre de mouvements et le score obtenu.
- Bouton Recommencer pour relancer la partie.

## Logique du score

Le score commence à 100.

À chaque mouvement, le score est recalculé selon la logique suivante :

```text
score = 100 - pénalité liée au nombre de mouvements