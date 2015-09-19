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

Entity.prototype.moveTo = function(x, y) {
	var toX = this.x + x;
	var toY = this.y + y;

	var tile = this.map.getTile(toX, toY);

	// Skip if the move position is not a valid tile
	if (!tile) return;

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

