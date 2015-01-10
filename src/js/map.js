var Map = function(tiles) {
    this.tiles = tiles;

    this.width = this.tiles[0].length;
    this.height = this.tiles.length;

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