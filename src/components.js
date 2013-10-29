// Allows an element to be located on a grid of tiles
Crafty.c('Grid', {
    init: function () {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
    },

    // Locate this entity at the given position on the grid
    at: function (x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x / Game.map_grid.tile.width,
                y: this.y / Game.map_grid.tile.height
            };
        } else {
            this.attr({
                x: x * Game.map_grid.tile.width,
                y: y * Game.map_grid.tile.height
            });
            return this;
        }
    }
});

// An entity that is drawn in 2D on canvas via our grid component
Crafty.c('Actor', {
    init: function () {
        this.requires('2D, Canvas, Grid');
    }
});

// The card interface for the game
Crafty.c('Card_Interface', {
    init:function () {
        this.requires('Actor, spr_card_interface, Border');
    }
});

// The card description interface for the game
Crafty.c('Card_Desc_Interface', {
    init:function () {
        this.requires('Actor, spr_card_desc_interface, Border');
    }
});

// The protagonist
Crafty.c('Tick', {
    init: function () {
        this.requires('Actor, spr_tick, SpriteAnimation, Fourway')
        .animate('PlayerStanding', 1, 1, 0)
        .animate('PlayerMovingRight', 0, 1, 3)
        .fourway(.1);

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 50;
        this.bind('NewDirection', function (data) {
            if (data.x > 0) {
                this.stop().animate('PlayerMovingRight', animation_speed, -1);
            } else {
                this.stop().animate('PlayerStanding', 0, 1);
            }
        });
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function () {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    // Stops the movement
    stopMovement: function () {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }
});

// A general card
Crafty.c('Card', {
    init: function () {
        this.requires('Actor');
    },
});

// An attack based card
Crafty.c('Attack_Card', {
    init: function () {
        this.requires('Actor, Card, Attack_Card_Sprite');
        this.bind('Click', function() {
            console.log("Clicked: Attack");
        });
    }
});