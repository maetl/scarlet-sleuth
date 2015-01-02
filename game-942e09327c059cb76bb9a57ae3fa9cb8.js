var Map = function(tiles) {
    this.tiles = tiles;

    this.width = this.tiles[0].length;
    this.height = this.tiles.length;

    // TODO: is this still needed?
    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);

    this.entities = {};
}

//Map.fromString()

// TODO: move to a level specific definition
Map.getTileDefinition = function(character) {
    var levelMap = {

        "#": TilePalette.Wall,

        ".": TilePalette.Lawn,

        ":": TilePalette.Entrance.defineArea({
                story: "Colonel Dijon was brutally murdered in his home only hours ago. After rushing to the crime scene, you're standing at the front door to the sprawling plantation estate."
            }),

        "+": TilePalette.ClosedDoor,

        "1": TilePalette.Floor.defineArea({
                room: "entrance hall",
             }),

        "2": TilePalette.Floor.defineArea({
                room: "billiard room"
             }),

        "3": TilePalette.Floor.defineArea({
                room: "library"
             }),

        "4": TilePalette.Floor.defineArea({
                room: "parlor"
             }),

        "5": TilePalette.Floor.defineArea({
                room: "kitchen"
             }),

        "5": TilePalette.Floor.defineArea({
                room: "kitchen"
             }),

        "6": TilePalette.Floor.defineArea({
                room: "dining room"
             }),

        "7": TilePalette.Floor.defineArea({
                room: "conservatory"
             }),

        "8": TilePalette.Floor.defineArea({
                room: "ballroom"
             })
    
    }

    return levelMap[character];
}

Map.buildFromArray = function(mapDefinition) {
    mapGrid = [];

    for(var mapY = 0; mapY < mapDefinition.length; mapY++) {
        var tileRow = mapDefinition[mapY].split('');
        mapGrid[mapY] = [];
        for (var mapX = 0; mapX < tileRow.length; mapX++) {
            mapGrid[mapY][mapX] = Map.getTileDefinition(tileRow[mapX]);
        }
    }

    return new Map(mapGrid);
}

Map.prototype.getWidth = function() {
    return this.width;
}

Map.prototype.getHeight = function() {
    return this.height;
}

Map.prototype.getTile = function(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return null; // TODO: null tile object?
    } else {
        return this.tiles[y][x] || null; // TODO: null tile object?
    }
}

// TODO: should the map be mutable?
Map.prototype.setTile = function(x, y, tile) {
    this.tiles[y][x] = tile;
}

// TODO: move this to stage or gamestate
Map.prototype.addEntities = function(entities) {
    for(var i=0; i<entities.length; i++) {
        var key = entities[i].getX() + "," + entities[i].getY();
        this.entities[key] = entities[i];
        this.entities[key].setMap(this);
    }
}

Map.prototype.addEntity = function(entity) {
    var key = entity.getX() + "," + entity.getY();
    this.entities[key] = entity;
    this.entities[key].setMap(this);
}

// TODO: hacky hack need to clean out with stage/game state
Map.prototype.updateEntity = function(entity, oldP, newP) {
    var oldKey = oldP[0] + "," + oldP[1];
    if (this.entities[oldKey]) {
        delete this.entities[oldKey];
    }

    // TODO: bounds checking
    var newKey = newP[0] + "," + newP[1];
    this.entities[newKey] = entity;
}

// TODO: move this to stage or gamestate
Map.prototype.getEntityAt = function(x, y)  {
    var key = x + "," + y;
    if (this.entities[key]) {
        return this.entities[key];
    } else {
        return false;
    }
}

Map.prototype.getEntities = function() {
    var actors = [];
    for(var key in this.entities) {
        actors.push(this.entities[key]);
    }
    return actors;
}
;
var Tile = function(properties) {
	properties = properties || {};
	this.walkable = properties['walkable'] || false;
	this.openable = properties['openable'] || false;
	this.glyph = properties['glyph'] || " ";
	this.color = properties['color'] || "#fff";
	this.backgroundColor = properties['backgroundColor'] || "#000";
	this.area = false;
}

Tile.prototype.defineArea = function(area) {
	var tile = Object.create(this);
	tile.room = area['room'] || false;
	tile.story = area['story'] || false;
	return tile;
}

Tile.prototype.getColor = function() {
	return this.color;
}

Tile.prototype.getBackgroundColor = function() {
	return this.backgroundColor;
}

Tile.prototype.getGlyph = function() {
	return this.glyph;
}

Tile.prototype.isWalkable = function() {
	return this.walkable;
}

Tile.prototype.isOpenable = function() {
	return this.openable;
}

Tile.prototype.getDescription = function() {
	if (this.story) {
		return this.story;
	} else if (this.room) {
		return "You're in the " + this.room + ".";
	} else {
		return "";
	}
}
;
var TilePalette = {};

TilePalette.Wall = new Tile({
	glyph: "#",
	color: "#F1D7A5"
});

TilePalette.Floor = new Tile({
	glyph: ".",
	color: "#f4a460",
	walkable: true
});

TilePalette.Lawn = new Tile({
	glyph: ".",
	color: "#01A611",
	walkable: true
});

TilePalette.Entrance = new Tile({
	glyph: ":",
	color: "#888",
	walkable: true
});

TilePalette.ClosedDoor = new Tile({
	glyph: "+",
	color: "#FCFCD7",
	openable: true
});

TilePalette.ClosedDoor.getOpenedTile = function() {
	return TilePalette.OpenDoor;
}

TilePalette.OpenDoor = new Tile({
	glyph: "/",
	color: "#FCFCD7",
	walkable: true
});
// Handles behavioural state for NPC entities.
var Behaviour = function(entity, map) {
	this.entity = entity;
	this.map = map;
}

Behaviour.prototype.setMap = function(map) {
	this.map = map;
}

Behaviour.prototype.rest = function() {
	return new RestAction();
}

Behaviour.prototype.wander = function() {
	var currentX = this.entity.getX();
	var currentY = this.entity.getY();

	// TODO: extract to RNG helper
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	// TODO: extract to cardinal direction object
	// TODO: clean up array shuffle
	var directions = shuffle([[0, -1], [1, 0], [0, 1], [-1, 0]]);

	for(var d = 0; d < 4; d++) {
		var tileX = currentX + directions[d][0];
		var tileY = currentY + directions[d][1];

		// TODO: bounds check (currently if NPCs walk off the map it crashes the game)
		if (this.map.getTile(tileX, tileY).isWalkable()) {
			return new MoveAction(directions[d]);
		}
	}

	// If no movement in a direction, then stand still
	return new RestAction();

}
;
var Entity = function(properties) {
	properties = properties || {};

	this.glyph = properties['glyph'] || '@';
	this.color = properties['color'] || '#fff';

	this.x = properties['x'] || 0;
    this.y = properties['y'] || 0;

    this.nextAction = false;

    // TODO: placeholder to mark NPC
    this.npcState = properties['npcState'] || true;

    this.mood = properties['mood'] || 'idle';

    this.story = properties['story'];

    // TODO: fix map binding in constructor rather than accessor
    this.behaviour = new Behaviour(this, {});
}

Entity.prototype.getGlyph = function() {
	return this.glyph;
}

Entity.prototype.getColor = function() {
	return this.color;
}

// TODO: replace with stage/game state object
Entity.prototype.setMap = function(map) {
	this.map = map;
	this.behaviour.setMap(map);
}

Entity.prototype.setPosition = function(x, y) {
	var oldP = [this.x, this.y];
	var newP = [x, y];
	this.map.updateEntity(this, oldP, newP);
	this.x = x;
	this.y = y;
}

Entity.prototype.getX = function() {
	return this.x;
}

Entity.prototype.getY = function() {
	return this.y;
}

Entity.prototype.talk = function() {
	Game.story = this.story;
}

Entity.prototype.takeTurn = function() {
	// TODO: mood is hacked in as a placeholder for NPC state
	if (this.mood == 'anxious') {
		// // wandering state
		// var currentX = this.getX();
		// var currentY = this.getY();

		// function shuffle(o) {
		// 	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		// 	return o;
		// };

		// // TODO: extract to cardinal direction object
		// // TODO: clean up array shuffle
		// var directions = shuffle([[0, -1], [1, 0], [0, 1], [-1, 0]]);

		// for(var d = 0; d < 4; d++) {
		// 	var tileX = currentX + directions[d][0];
		// 	var tileY = currentY + directions[d][1];

		// 	if (this.map.getTile(tileX, tileY).isWalkable()) {
		// 		return new MoveAction(directions[d]);
		// 	}		
		// }

		return this.behaviour.wander();

	}

	return this.behaviour.rest();
}

Entity.prototype.moveTo = function(x, y) {
	var toX = this.x + x;
	var toY = this.y + y;

	var tile = this.map.getTile(toX, toY);
	var entity = this.map.getEntityAt(toX, toY);

	if (entity) {
		// TODO: deal with player vs actors here
		entity.talk();
	} else if (tile.isWalkable()) {
		this.setPosition(toX, toY);
	} else if (tile.isOpenable()) {
		newTile = tile.getOpenedTile();
		this.map.setTile(toX, toY, newTile);
	}
}

;
var Player = function(properties) {
	Entity.call(this, properties);
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.suspectsMet = function() {
    return 0;
}

Player.prototype.murderWeapon = function() {
    return "unknown";
}

Player.prototype.takeTurn = function() {
	var action = this.nextAction;
	this.nextAction = false;
	return action;
}

Entity.prototype.addNextAction = function(action) {
	this.nextAction = action;
}
;
var RestAction = function() {}

RestAction.prototype.perform = function(actor) {
	return;
}

var MoveAction = function(transform) {
    this.x = transform[0];
    this.y = transform[1];
}

MoveAction.prototype.isMove = function() {
    return true;
}

MoveAction.prototype.getX = function() {
    return this.x;
}

MoveAction.prototype.getY = function() {
    return this.y;
}

MoveAction.prototype.perform = function(actor) {
	actor.moveTo(this.getX(), this.getY());
}
;
var Story = function() {
	//
}

Story.prototype.getEntities = function() {
	return [
        new Entity({
            x: 42,
            y: 20,
            color: '#ff69b4',
            name: "Jeeves",
            story: '"This is just so horribly tragic," says Jeeves.',
            mood: 'anxious'
        }),
        new Entity({
            x: 22,
            y: 15,
            color: '#ff69b4',
            name: "Mr Bell",
            story: '"I\'ve been here in the library the whole time. Ask Claudia. She was here too, when it happened."',
            mood: 'anxious'
        }),
        new Entity({
            x: 15,
            y: 12,
            color: '#ff69b4',
            name: "Claudia",
            story: '"I was in the library with Mr Bell. I didn\'t see what happened."',
            mood: 'anxious'
        })
    ];
}

// Story.prototype.addCharacters = function(characters) {
// 	this.characters = characters;
// }

Story.buildFromLevel = function() {


	return new Story();
}
;
var Stage = {
	
}
;










var Game = {};

function gameLoop(timestamp) {
    updateGameState();
    renderMap();
    renderStory();
    renderHud();
}

function main() {
    Game.console = new ROT.Display({
        width: 100,
        height: 30,
        fontFamily: "Consolas, monaco, monospace"
    });

    $("#game").append(Game.console.getContainer());

    Game.turns = 0;
    Game.suspects = [];

    Game.player = new Player({
        x: 43,
        y: 26,
        npcState: false
    });

    //Game.map = Map.buildFromArray(mapDefinition);
    Game.map = Map.buildFromArray(largeMapDefinition);

    // TODO: load from level definition
    Game.story = Story.buildFromLevel();

    // TODO: untangle this
    Game.map.addEntities(Game.story.getEntities());
    Game.map.addEntity(Game.player);

    // TODO: stage/state encapsulation
    Game.actors = Game.map.getEntities();
    Game.currentActor = 0;

    $(document).keydown(function(ev) {
        handleInputAction(ev.which);
    });

    window.requestAnimationFrame(gameLoop);
}

function updateGameState() {
    var action = Game.actors[Game.currentActor].takeTurn();

    if (!action) return;

    action.perform(Game.actors[Game.currentActor]);

    Game.currentActor = (Game.currentActor + 1) % Game.actors.length;
}

function handleInputAction(keyCode) {

    var action = false;

    switch(keyCode) {
        case 37: action = new MoveAction([-1, 0]); break;
        case 38: action = new MoveAction([0, -1]); break;
        case 39: action = new MoveAction([1, 0]); break;
        case 40: action = new MoveAction([0, 1]); break;
    }

    Game.player.addNextAction(action);
}

var mapDefinition = [
"...................................................................",
"...................................................................",
"......######################################################.......",
"......#22222222222222222#88888888888888888#55555555#66666666#......",
"..#####22222222222222222#88888888888888888#55555555#66666666#####..",
"..#777#22222222222222222#88888888888888888#55555555#666666666666#..",
"..#777#22222222222222222#88888888888888888#55555555+666666666666#..",
"..#777+22222222222222222+88888888888888888#55555555#666666666666#..",
"..#777###################88888888888888888#####+#######+#########..",
"..#777+33333333333333333+88888888888888888#444444444444444444444#..",
"..#777#33333333333333333#88888888888888888#444444444444444444444#..",
"..#777#33333333333333333#88888888888888888+444444444444444444444#..",
"..#####33333333333333333#88888888888888888#44444444444444444#####..",
"......#33333333333333333#88888888888888888#44444444444444444#......",
"......###########################+###########################......",
"........................#11111111111111111#........................",
".........................#111111111111111#.........................",
"..........................#######+#######..........................",
"...............................:::::...............................",
"...............................:::::..............................."
];

var largeMapDefinition = [
"......................................................................................",
"......................................................................................",
"......................................................................................",
"......................................................................................",
"......................................................................................",
"......................................................................................",
"......................................................................................",
"................######################################################................",
"................#22222222222222222#88888888888888888#55555555#66666666#...............",
"............#####22222222222222222#88888888888888888#55555555#66666666#####...........",
"............#777#22222222222222222#88888888888888888#55555555#666666666666#...........",
"............#777#22222222222222222#88888888888888888#55555555+666666666666#...........",
"............#777+22222222222222222+88888888888888888#55555555#666666666666#...........",
"............#777###################88888888888888888#####+#######+#########...........",
"............#777+33333333333333333+88888888888888888#444444444444444444444#...........",
"............#777#33333333333333333#88888888888888888#444444444444444444444#...........",
"............#777#33333333333333333#88888888888888888+444444444444444444444#...........",
"............#####33333333333333333#88888888888888888#44444444444444444#####...........",
"................#33333333333333333#88888888888888888#44444444444444444#...............",
"................###########################+###########################...............",
"..................................#11111111111111111#.................................",
"...................................#111111111111111#..................................",
"....................................#######+#######...................................",
".........................................:::::........................................",
".........................................:::::........................................",
".........................................:::::........................................",
"..........................................:::.........................................",
"..........................................:::.........................................",
"..........................................:::.........................................",
"..........................................:::.........................................",
"..........................................:::.........................................",
"..........................................:::........................................."
];

function renderMap() {

    Game.console.clear();

    var map = Game.map;

    // TODO: extract as accessor methods
    var screenWidth = 70;
    var screenHeight = 30;

    var playerX = Game.player.getX();
    var playerY = Game.player.getY();

    var mapWidth = map.getWidth();
    var mapHeight = map.getHeight();

    var topLeftX = Math.max(0, playerX - (screenWidth / 2));
    topLeftX = Math.min(topLeftX, mapWidth - screenWidth);

    var topLeftY = Math.max(0, playerY - (screenHeight / 2));
    topLeftY = Math.min(topLeftY, mapHeight - screenHeight);
    
    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
        for (var y = topLeftY; y < topLeftY + screenHeight; y++) {

            var tile = map.getTile(x, y);

            if (!tile) continue;

            // TODO: check for entities and items at this location
            if (x == playerX && y == playerY) {
                var glyph = '@';
                var color = '#fff';
            } else if (suspect = map.getEntityAt(x, y)) {
                var glyph = '@';
                var color = '#ff69b4';

            } else {
                var glyph = tile.getGlyph();
                var color = tile.getColor();
            }

            Game.console.draw(
                x - topLeftX,
                y - topLeftY,
                glyph,
                color,
                tile.getBackgroundColor()
            );
        }
    }

    window.requestAnimationFrame(gameLoop);
}

function renderStory() {
    // TODO: use story object/state machine
    var story = false;

    if (story) {
        // Dialog goes here
    } else {
        var currentTile = Game.map.getTile(Game.player.getX(), Game.player.getY());
        var description = currentTile.getDescription();
    }
    
    // TODO: accessor for canvas size
    var textWidth = (100 - 71) - 2;
    Game.console.drawText(71, 0, description, textWidth);
}

function renderHud() {
    Game.console.drawText(71, 27, "Weapon:");
    Game.console.drawText(81, 27, Game.player.murderWeapon());

    Game.console.drawText(71, 28, "Suspects:");
    Game.console.drawText(81, 28, Game.player.suspectsMet().toString() + " of " + Game.suspects.length.toString());

    Game.console.drawText(71, 29, "Turns:");
    Game.console.drawText(81, 29, Game.turns.toString());
}

$(main);

//$(window).on('resize', onResize);
