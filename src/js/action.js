var RestAction = function() {}

RestAction.prototype.perform = function(entity) {
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

MoveAction.prototype.perform = function(entity) {
	entity.moveTo(this.getX(), this.getY());
}
