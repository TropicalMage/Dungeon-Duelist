///////////////////////////////////////////////////////////////////// Game Scene
Crafty.scene('Game', function () {
    World = Crafty.e('2D, Canvas, TiledMapBuilder, Grid').setMapDataSource(SOURCE)
    .set_z(1)
    .createWorld(function(map) {});
    
    Crafty.e('Card_Interface').at(0, 26).set_z(1);
    Crafty.e('Card_Desc_Interface').at(0, 0).set_z(1);
    Tick = Crafty.e('Tick').at(14, 12).set_z(2);
    
    Crafty.e('Attack_Card').at(1, 27).set_z(2);
    Crafty.e('Magic_Card').at(11, 27).set_z(2);
    Crafty.e('Attack_Card').at(21, 27).set_z(2);
    Crafty.e('Magic_Card').at(31, 27).set_z(2);
    Crafty.e('Attack_Card').at(41, 27).set_z(2);
    
    var heart = Crafty.e('2D, Canvas, spr_heart')
    heart.x = 16 * 14; // Tile Size * 14
    heart.y = 16; // Top Edge Buffer
    
    var tick_hp_text = Crafty.e('Tick_HP, 2D, DOM, Text')
        .text(Tick.health)
        .attr({
            x: 16 * 15, // Tile Size * 15
            y: 12 // Top Edge Buffer
        })
        .textFont({ family: 'Arial', size: '16px', weight: 'bold' })
        .textColor('#FFFFFF');
});

////////////////////////////////////////////////////////////////// Loading Scene
Crafty.scene('Loading', function () {
    
    
    var load_text = Crafty.e('2D, DOM, Text')
        .text('Initializing the game...')
        .attr({
            x: 0,
            y: Game.height() / 2 - 12,
            w: Game.width()
        })
        .textFont({ type: 'italic', family: 'Arial', size: '24px', weight: 'bold' })

    // Load all of our assets
    Crafty.load([
        'assets/images/BG_16x16.png',
        'assets/images/card_interface.png', 
        'assets/images/card_desc_interface.png', 
        'assets/images/Tick_64x128.png',
        'assets/images/cards_128x160.png',
        'assets/images/heart_16x16.png',
        
        'assets/sounds/card_swipe.mp3', 
        'assets/sounds/card_swipe.ogg', 
        'assets/sounds/card_swipe.aac'
    ], function () {
        // Define our Sprites
        load_text.text('Loading sprites...');
        var directory = "assets/images/";
        
        Crafty.sprite(800, 192, directory + 'card_interface.png', {
            spr_card_interface: [0,0]
        });
        
        Crafty.sprite(208, 416, directory + 'card_desc_interface.png', {
            spr_card_desc_interface: [0,0]
        });
        
        Crafty.sprite(64, 128, directory + 'Tick_64x128.png', {
            spr_tick: [0,0]
        });
        
        Crafty.sprite(128, 160, directory + 'cards_128x160.png', {
            spr_attack_card: [0,0], 
            spr_fireball_card: [1,0]
        });
        
        Crafty.sprite(15, directory + 'heart_16x16.png', {
            spr_heart: [0,0]
        });

        // Define our Sounds
        load_text.text('Loading sounds...');
        directory = "assets/sounds/";
        Crafty.audio.add({
            card_swipe: [directory + 'card_swipe.mp3', directory + 'card_swipe.ogg', directory + 'card_swipe.aac',]
        });
        
        // Allow the player to start the game
        load_text.text('The game is ready! Press any key to continue.');
        Crafty.audio.play('card_swipe');
        this.start_game = Crafty.bind('KeyDown', function () {
            Crafty.scene('Game');
        });
    });
    
}, function () {
    this.unbind('KeyDown');
});