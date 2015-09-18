# Scarlet Sleuth

A retro murder mystery game.

A remake of the 1983 DOS game [Sleuth](http://en.wikipedia.org/wiki/Sleuth_(video_game) with expanded elements influenced by modern roguelikes.

### Resources

- http://www.colourlovers.com/pattern/4642425/Koini

### Concepts

*Possible Eras:*

- The Gilded Age
- The Roaring Twenties
- Victorian London
- Belle Époque
- Razor Gang Sydney
- LA Noir
- Colonial Egypt

*Possible Scenes:*

- Mississippi Steamboat
- Southern Mansion
- Gatsby Party
- London Townhouse
- British Country Mansion
- French Country Mansion
- German (Weimar) Country Mansion
- Orient Express
- Suez Cruise
- Hong Kong Market
- Surry Hills Slum

### Gameplay

- Grid based map subdivided into rooms
- Each map has a set of suspects
- One of the rooms has a body or clues to the body's disappearance (eg: bloodstains)
- One of the suspects is the murderer
- Suspects can be questioned ('q') to reveal their alibis
- Rooms can be searched for clues ('s') to reveal items or features of interest
- Items can be picked up to assist with the investigation

Unsure about these:

- Rogue style combat (following Sherlock Holmes, using revolvers and riding crops)
- Role playing stats for investigation (see Gumshoe system for tabletop games)
- Permadeath? Saved characters? Or start from scratch each level?
- Is money required to travel between scenes?

### Engine

- Turn based
- Command/action based input
- NPCs behave differently depending on their anxiety level and alibis
- Standard A* chase algorithm once the murderer decides to attack the player
- Randomly generated story scenarios: suspects, rooms, items, murder weapon and motive
- Text based story log
