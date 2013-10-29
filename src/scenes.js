///////////////////////////////////////////////////////////////////// Game Scene
Crafty.scene('Game', function () {
    Crafty.e('Card_Interface').at(0, 26);
    Crafty.e('Card_Desc_Interface').at(0, 0);
    Crafty.e('Tick').at(18, 5);
    Crafty.e('Attack_Card').at(1, 27);
    Crafty.e('Attack_Card').at(11, 27);
    Crafty.e('Attack_Card').at(21, 27);
    Crafty.e('Attack_Card').at(31, 27);
    Crafty.e('Attack_Card').at(41, 27);
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
        .css($text_css);

    // Load our sprite map image
    Crafty.load([
        'assets/images/card_interface.png', 
        'assets/images/card_desc_interface.png', 
        'assets/images/Tick_16x24.png',
        'assets/images/Tick_64x128.png',
        'assets/images/attack_card_140x280.png', 
        
        'assets/sounds/card_swipe.mp3', 
        'assets/sounds/card_swipe.ogg', 
        'assets/sounds/card_swipe.aac'
    ], function () {
        // Once the images are loaded...

/*        Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
            spr_tree: [0, 0],
            spr_bush: [1, 0],
            spr_village: [0, 1],
            spr_rock: [1, 1]
        });*/
        
        // Define our Sprites
        load_text.text('Loading sprites...');
        var directory = "assets/images/";
        
        Crafty.sprite(directory + 'card_interface.png', {
            spr_card_interface: [0,0,800,192]
        });
        
        Crafty.sprite(directory + 'card_desc_interface.png', {
            spr_card_desc_interface: [0,0,208,416]
        });
        
        Crafty.sprite(64, 128, directory + 'Tick_64x128.png', {
            spr_tick: [0,0]
        });
        
        Crafty.sprite(directory + 'attack_card_128x160.png', {
            Attack_Card_Sprite: [0,0,128,160]
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