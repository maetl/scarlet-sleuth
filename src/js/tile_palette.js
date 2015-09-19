var TilePalette = {};

TilePalette.Wall = new Tile({
	glyph: "#",
	color: "#F1D7A5",
	//backgroundColor: "#222"
});

TilePalette.Floor = new Tile({
	glyph: ".",
	color: "#f4a460",
	//backgroundColor: "#f4a460",
	walkable: true,
});

TilePalette.Lawn = new Tile({
	glyph: ".",
	color: "#01C811",
	//backgroundColor: '#01A611',
	walkable: true,
});

TilePalette.Entrance = new Tile({
	glyph: ":",
	color: "#888",
	walkable: true,
});

TilePalette.ClosedDoor = new Tile({
	glyph: "+",
	color: "#FCFCD7",
	openable: true,
});

TilePalette.ClosedDoor.getOpenedTile = function() {
	return TilePalette.OpenDoor;
}

TilePalette.OpenDoor = new Tile({
	glyph: "/",
	color: "#FCFCD7",
	walkable: true,
});

TilePalette.PC = new Tile({
	glyph: "@",
	color: "#fff",
});

TilePalette.NPC = new Tile({
	glyph: "Q",
	color: "#ff69b4",
});
