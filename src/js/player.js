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
