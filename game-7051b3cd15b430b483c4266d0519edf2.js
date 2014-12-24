function main(){Game.console=new ROT.Display({width:100,height:30}),$("#game").append(Game.console.getContainer()),Game.turns=0,Game.suspects=[],Game.player=new Entity({x:43,y:26}),Game.player.suspectsMet=function(){return 0},Game.player.murderWeapon=function(){return"unknown"},Game.map=Map.buildFromArray(largeMapDefinition),Game.player.setMap(Game.map),Game.suspects=[new Entity({x:16,y:34,name:"Jeeves"}),new Entity({x:11,y:14,name:"Mr Bell"}),new Entity({x:8,y:5,name:"Claudia"})],Game.map.addEntities(Game.suspects),$(document).keydown(function(e){var t=getInputAction(e.which);t.isMove()&&Game.player.moveTo(t.getX(),t.getY()),renderMap(),renderStory(),renderHud(),Game.turns++}),renderMap(),renderStory(),renderHud()}function getInputAction(e){switch(e){case 37:return new MoveAction([-1,0]);case 38:return new MoveAction([0,-1]);case 39:return new MoveAction([1,0]);case 40:return new MoveAction([0,1])}return new NullAction}function renderMap(){Game.console.clear();var e=Game.map,t=70,o=30,n=Game.player.getX(),i=Game.player.getY(),r=e.getWidth(),a=e.getHeight(),l=Math.max(0,n-t/2);l=Math.min(l,r-t);var s=Math.max(0,i-o/2);s=Math.min(s,a-o);for(var p=l;l+t>p;p++)for(var u=s;s+o>u;u++){var c=e.getTile(p,u);if(c){if(p==n&&u==i)var h="@",m="#fff";else var h=c.getGlyph(),m=c.getColor();Game.console.draw(p-l,u-s,h,m,c.getBackgroundColor())}}}function renderStory(){var e=Game.map.getTile(Game.player.getX(),Game.player.getY()),t=27;Game.console.drawText(71,0,e.getDescription(),t)}function renderHud(){Game.console.drawText(71,27,"Weapon:"),Game.console.drawText(81,27,Game.player.murderWeapon()),Game.console.drawText(71,28,"Suspects:"),Game.console.drawText(81,28,Game.player.suspectsMet().toString()+" of "+Game.suspects.length.toString()),Game.console.drawText(71,29,"Turns:"),Game.console.drawText(81,29,Game.turns.toString())}var Map=function(e){this.tiles=e,this.width=this.tiles[0].length,this.height=this.tiles.length,this.scheduler=new ROT.Scheduler.Speed,this.engine=new ROT.Engine(this.scheduler)};Map.getTileDefinition=function(e){var t={"#":TilePalette.Wall,".":TilePalette.Lawn,":":TilePalette.Entrance.defineArea({story:"Colonel Dijon was brutally murdered in his home only hours ago. After rushing to the crime scene, you're standing at the front door to the sprawling plantation estate."}),"+":TilePalette.ClosedDoor,1:TilePalette.Floor.defineArea({room:"entrance hall"}),2:TilePalette.Floor.defineArea({room:"billiard room"}),3:TilePalette.Floor.defineArea({room:"library"}),4:TilePalette.Floor.defineArea({room:"parlor"}),5:TilePalette.Floor.defineArea({room:"kitchen"}),5:TilePalette.Floor.defineArea({room:"kitchen"}),6:TilePalette.Floor.defineArea({room:"dining room"}),7:TilePalette.Floor.defineArea({room:"conservatory"}),8:TilePalette.Floor.defineArea({room:"ballroom"})};return t[e]},Map.buildFromArray=function(e){mapGrid=[];for(var t=0;t<e.length;t++){var o=e[t].split("");mapGrid[t]=[];for(var n=0;n<o.length;n++)mapGrid[t][n]=Map.getTileDefinition(o[n])}return new Map(mapGrid)},Map.prototype.getWidth=function(){return this.width},Map.prototype.getHeight=function(){return this.height},Map.prototype.getTile=function(e,t){return 0>e||e>=this.width||0>t||t>=this.height?null:this.tiles[t][e]||null},Map.prototype.setTile=function(e,t,o){this.tiles[t][e]=o},Map.prototype.addEntities=function(e){this.entities={};for(var t=0;t<e.length;t++){var o=e[t].getX()+","+e[t].getY();this.entities[o]=e[t]}},Map.prototype.getEntityAt=function(e,t){var o=e+","+t;return this.entities[o]?this.entities[o]:!1};var Tile=function(e){e=e||{},this.walkable=e.walkable||!1,this.openable=e.openable||!1,this.glyph=e.glyph||" ",this.color=e.color||"#fff",this.backgroundColor=e.backgroundColor||"#000",this.area=!1};Tile.prototype.defineArea=function(e){var t=Object.create(this);return t.room=e.room||!1,t.story=e.story||!1,t},Tile.prototype.getColor=function(){return this.color},Tile.prototype.getBackgroundColor=function(){return this.backgroundColor},Tile.prototype.getGlyph=function(){return this.glyph},Tile.prototype.isWalkable=function(){return this.walkable},Tile.prototype.isOpenable=function(){return this.openable},Tile.prototype.getDescription=function(){return this.story?this.story:this.room?"You're in the "+this.room+".":""};var TilePalette={};TilePalette.Wall=new Tile({glyph:"#",color:"#F1D7A5"}),TilePalette.Floor=new Tile({glyph:".",color:"#f4a460",walkable:!0}),TilePalette.Lawn=new Tile({glyph:".",color:"#01A611",walkable:!0}),TilePalette.Entrance=new Tile({glyph:":",color:"#888",walkable:!0}),TilePalette.ClosedDoor=new Tile({glyph:"+",color:"#FCFCD7",openable:!0}),TilePalette.ClosedDoor.getOpenedTile=function(){return TilePalette.OpenDoor},TilePalette.OpenDoor=new Tile({glyph:"/",color:"#FCFCD7",walkable:!0});var Entity=function(e){e=e||{},this.x=e.x||0,this.y=e.y||0};Entity.prototype.setMap=function(e){this.map=e},Entity.prototype.setPosition=function(e,t){this.x=e,this.y=t},Entity.prototype.getX=function(){return this.x},Entity.prototype.getY=function(){return this.y},Entity.prototype.moveTo=function(e,t){var o=this.x+e,n=this.y+t,i=this.map.getTile(o,n);i.isWalkable()?this.setPosition(o,n):i.isOpenable()&&(newTile=i.getOpenedTile(),this.map.setTile(o,n,newTile))};var NullAction=function(){};NullAction.prototype.isMove=function(){return!1};var MoveAction=function(e){this.x=e[0],this.y=e[1]};MoveAction.prototype.isMove=function(){return!0},MoveAction.prototype.getX=function(){return this.x},MoveAction.prototype.getY=function(){return this.y};var Game={},mapDefinition=["...................................................................","...................................................................","......######################################################.......","......#22222222222222222#88888888888888888#55555555#66666666#......","..#####22222222222222222#88888888888888888#55555555#66666666#####..","..#777#22222222222222222#88888888888888888#55555555#666666666666#..","..#777#22222222222222222#88888888888888888#55555555+666666666666#..","..#777+22222222222222222+88888888888888888#55555555#666666666666#..","..#777###################88888888888888888#####+#######+#########..","..#777+33333333333333333+88888888888888888#444444444444444444444#..","..#777#33333333333333333#88888888888888888#444444444444444444444#..","..#777#33333333333333333#88888888888888888+444444444444444444444#..","..#####33333333333333333#88888888888888888#44444444444444444#####..","......#33333333333333333#88888888888888888#44444444444444444#......","......###########################+###########################......","........................#11111111111111111#........................",".........................#111111111111111#.........................","..........................#######+#######..........................","...............................:::::...............................","...............................:::::..............................."],largeMapDefinition=["......................................................................................","......................................................................................","......................................................................................","......................................................................................","......................................................................................","......................................................................................","......................................................................................","................######################################################................","................#22222222222222222#88888888888888888#55555555#66666666#...............","............#####22222222222222222#88888888888888888#55555555#66666666#####...........","............#777#22222222222222222#88888888888888888#55555555#666666666666#...........","............#777#22222222222222222#88888888888888888#55555555+666666666666#...........","............#777+22222222222222222+88888888888888888#55555555#666666666666#...........","............#777###################88888888888888888#####+#######+#########...........","............#777+33333333333333333+88888888888888888#444444444444444444444#...........","............#777#33333333333333333#88888888888888888#444444444444444444444#...........","............#777#33333333333333333#88888888888888888+444444444444444444444#...........","............#####33333333333333333#88888888888888888#44444444444444444#####...........","................#33333333333333333#88888888888888888#44444444444444444#...............","................###########################+###########################...............","..................................#11111111111111111#.................................","...................................#111111111111111#..................................","....................................#######+#######...................................",".........................................:::::........................................",".........................................:::::........................................",".........................................:::::........................................","..........................................:::.........................................","..........................................:::.........................................","..........................................:::.........................................","..........................................:::.........................................","..........................................:::.........................................","..........................................:::........................................."];$(main);