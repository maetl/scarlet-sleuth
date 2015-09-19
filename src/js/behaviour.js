// Handles behavioural state for NPC entities.
var Behaviour = function(entity, map) {
	this.entity = entity;
	this.map = map;
	this.direction = false;
}

Behaviour.prototype.setMap = function(map) {
	this.map = map;
}

Behaviour.prototype.rest = function() {
	return new RestAction();
}

Behaviour.prototype.pace = function() {
	if (!this.direction) {
		this.direction = Rung.Array.shuffle([[0, -1], [1, 0], [0, 1], [-1, 0]])[0];
	}

	var currentX = this.entity.getX();
	var currentY = this.entity.getY();

	var tileX = currentX + this.direction[0];
	var tileY = currentY + this.direction[1];
	var tile = this.map.getTile(tileX, tileY);

	if (!tile || !tile.isWalkable()) {
		this.direction = [this.direction[0] * -1, this.direction[1] * -1];
	}

	return new MoveAction(this.direction);
}

Behaviour.prototype.wander = function() {
	var currentX = this.entity.getX();
	var currentY = this.entity.getY();

	// TODO: extract to cardinal direction object
	var directions = Rung.Array.shuffle([[0, -1], [1, 0], [0, 1], [-1, 0]]);

	for(var d = 0; d < 4; d++) {
		var tileX = currentX + directions[d][0];
		var tileY = currentY + directions[d][1];
		var tile = this.map.getTile(tileX, tileY);

		// If tile in the given direction is walkable then move to it
		if (tile && tile.isWalkable()) {
			return new MoveAction(directions[d]);
		}
	}

	// If no movement in a direction, then stand still
	return new RestAction();
}
