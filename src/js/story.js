var Story = function() {
	//
}

Story.prototype.getActors = function() {
	return [
        new Suspect({
            x: 42,
            y: 20,
            name: "Jeeves",
            story: '"This is just so horribly tragic," says Jeeves.',
            mood: 'tense'
        }),
        new Suspect({
            x: 22,
            y: 15,
            name: "Mr Bell",
            story: '"I\'ve been here in the library the whole time. Ask Claudia. She was here too, when it happened."',
            mood: 'nonchalant'
        }),
        new Suspect({
            x: 15,
            y: 12,
            name: "Claudia",
            story: '"I was in the library with Mr Bell. I didn\'t see what happened."',
            mood: 'anxious'
        })
    ];
}

// Story.prototype.addCharacters = function(characters) {
// 	this.characters = characters;
// }

Story.buildFromLevel = function() {


	return new Story();
}