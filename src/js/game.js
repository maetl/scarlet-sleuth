//= require map
//= require tile
//= require tile_palette
//= require behaviour
//= require entity
//= require player
//= require action
//= require story
//= require stage

var Game = {};

function gameLoop(timestamp) {
    updateGameState();
    renderMap();
    //renderStory();
    renderHud();
}

function main() {
    // Game.console = new ROT.Display({
    //     width: 100,
    //     height: 30,
    //     fontFamily: "Consolas, monaco, monospace"
    // });

    var canvas = document.querySelector('#display');

    var vWidth = document.documentElement.clientWidth;
    var vHeight = document.documentElement.clientHeight;
    //var vWidth = 1280;
    //var vHeight = 640;

    // TODO: decide on fixed width or resizable (and how to handle breakpoints)
    canvas.style.width = vWidth.toString() + "px";
    canvas.style.height = vHeight.toString() + "px";


    Game.terminal = new Overprint.Terminal(100, 30, canvas);
    //$("#game").append(Game.console.getContainer());

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
    Game.turns++;
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

    //Game.console.clear();

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
                var cell = TilePalette.PC.getCell();
            } else if (suspect = map.getEntityAt(x, y)) {
                var cell = TilePalette.NPC.getCell();
            } else {
                var cell = tile.getCell();
            }

            Game.terminal.writeGlyph(x - topLeftX, y - topLeftY, cell);
            // Game.console.draw(
            //     x - topLeftX,
            //     y - topLeftY,
            //     glyph,
            //     color,
            //     tile.getBackgroundColor()
            // );
        }
    }

    Game.terminal.render();

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
    Game.terminal.writeText(71, 27, "Weapon:");
    Game.terminal.writeText(81, 27, Game.player.murderWeapon());

    Game.terminal.writeText(71, 28, "Suspects:");
    Game.terminal.writeText(81, 28, Game.player.suspectsMet().toString() + " of " + Game.suspects.length.toString());

    Game.terminal.writeText(71, 29, "Turns:");
    Game.terminal.writeText(81, 29, Game.turns.toString());
}

$(main);

//$(window).on('resize', onResize);
