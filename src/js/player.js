var Player = function(properties) {
	Actor.call(this, properties);
}

Player.prototype = Object.create(Actor.prototype);

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
