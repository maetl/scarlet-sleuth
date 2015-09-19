var Actor = function(properties) {
  Entity.call(this, properties);
}

Actor.prototype = Object.create(Entity.prototype);

// Actors are entities which are capable of taking turns.
Actor.prototype.takeTurn = function() {
  return new RestAction();
}

// TODO: create a bump callback which fires every time the player
// bumps into an actor
Actor.prototype.talk = function() {
  Game.story = this.story;
}

var Suspect = function(properties) {
  this.name = properties['name'] || 'Stranger';
  Actor.call(this, properties);
}

Suspect.prototype = Object.create(Actor.prototype);

Suspect.prototype.takeTurn = function() {
  // TODO: check if player is in the same room to determine mood
  switch(this.mood) {
    case 'tense':
      return this.behaviour.pace();
    break;

    case 'anxious':
      return this.behaviour.wander();
    break;

    default:
      return this.behaviour.rest();
    break;
  }
}

