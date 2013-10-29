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
        this.requires('Actor, spr_card_interface, Interface');
    }
});

// The card description interface for the game
Crafty.c('Card_Desc_Interface', {
    init:function () {
        this.requires('Actor, spr_card_desc_interface, Interface');
    }
});

// The protagonist
Crafty.c('Tick', {
    init: function () {
        this.requires('Actor, Fourway, Collision, spr_tick, SpriteAnimation')
        .fourway(3)
        .stopOnBorder()
        .animate('PlayerStanding', 1, 1, 1)
        .animate('PlayerMovingRight', 0, 1, 3);

        this.health = 10;
        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 35;
        this.bind('NewDirection', function (data) {
            if (data.x > 0) {
                this.stop().animate('PlayerMovingRight', animation_speed, -1);
            } else {
                this.stop().animate('PlayerStanding', animation_speed, -1);
            }
        });
        
        // Every Frame: Check right and upper collisions
        this.bind('EnterFrame', function () {
            // Touch the Right Edge (64 = Tick's Width)
            if (this.x + 64 > Game.width()) {
                this.stopMovement();
            }
            
            // Touch the Upper Edge
            if (this.y < 0) {
                this.stopMovement();
            }
	    });
    },

    // Stop the PC when he collides with the edges of the visual screen
    stopOnBorder: function () {
        // Touch the Left and Bottom Edge
        this.onHit('Interface', this.stopMovement);
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
        this.requires('Actor, Mouse');
    },
});

// Standard Attack Card
Crafty.c('Attack_Card', {
    init: function () {
        this.requires('Card, spr_attack_card');
        var description = "Swing at your foe with your discus <br> Atk: 1";
        
        this.bind('Click', function() {
            Crafty.audio.play('card_swipe');
            Tick.health -= 1;
        });
        
        var desc_text = Crafty.e('2D, DOM, Text')
        this.bind('MouseOver', function() {
            desc_text.text(description)
                .attr({
                    x: 5, // Left Edge Buffer
                    y: 5, // Top Edge Buffer
                    w: 203 // Width of description area - 5
                })
                .textFont({ family: 'Arial', size: '14px' })
                .textColor('#FFFFFF');
        });
        
        this.bind('MouseOut', function() {
            desc_text.text("");
        });
    }
});

// Standard Magic Card
Crafty.c('Magic_Card', {
    init: function () {
        this.requires('Card, spr_fireball_card');
        var description = "Blasts the foe with a fiery burst. <br> Atk: 2";
        
        this.bind('Click', function() {
            Crafty.audio.play('card_swipe');
            Tick.health -= 2;
        });
        
        var desc_text = Crafty.e('2D, DOM, Text')
        this.bind('MouseOver', function() {
            desc_text.text(description)
                .attr({
                    x: 5, // Left Edge Buffer
                    y: 5, // Top Edge Buffer
                    w: 203 // Width of description area - 5
                })
                .textFont({ family: 'Arial', size: '14px' })
                .textColor('#FFFFFF');
        });
        this.bind('MouseOut', function() {
            desc_text.text("");
        });
    }
});