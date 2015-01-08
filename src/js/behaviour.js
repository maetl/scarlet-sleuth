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

	// TODO: extract to cardinal direction object
	// TODO: clean up array shuffle
	var directions = Rung.Array.shuffle([[0, -1], [1, 0], [0, 1], [-1, 0]]);

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
