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
