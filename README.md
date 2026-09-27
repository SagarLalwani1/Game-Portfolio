# Sagar Portfolio v0.2

A professional-first portfolio with an optional interactive journey mode.

## Modes
- **Professional view:** conventional portfolio for recruiters/hiring managers.
- **Journey mode:** a text-only, keyboard-controlled world with five doors for 2019–20, 2021–22, 2023–24, 2025–26 and the future direction.
- **Rewards:** discovering a room unlocks a small achievement toast. These can later become real pixel-art badges/items.

## Controls
- WASD / Arrow keys to move.
- E / Enter to enter the nearest door.
- The chapter buttons below the game also work as a direct-access fallback.

## Future asset integration
The game intentionally uses simple vector/text placeholders for now. Once the original pixel assets, photos and project material are supplied, replace the vector room layer with the expanded Tiled/Kaboom-style map and sprites without changing the portfolio content model.

## Map expansion
The current journey world is 2200x1200 and camera-following. It is already larger than a single screen. A future pixel-art map can be made larger again in Tiled (or generated procedurally) and the door coordinates can be moved into rooms/areas.

For running locally use the following commands
npm install
npm run dev
