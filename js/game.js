let config = {
    type:Phaser.AUTO,
    parent: 'gameWindow',
    autoCenter: true,
    width:1200,
    height:1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

let player;
let crosshair;
let walls;
let inspectableAssets;

let wallRects;

let controls;

let waveTimer;
let gameOver;

function preload() {
    //Load image assets
    this.load.image('Crosshair', './assets/Icon_Crosshair.png');
    this.load.spritesheet('Player', './assets/Spritesheet_Player.png', {frameWidth:64, frameHeight:64});
    this.load.image('Ghost', './assets/Sprite_Ghost.png');
    this.load.image('Inspectable', './assets/Icon_Inspectable.png');

    this.load.image('Dark_Overlay', './assets/Sprite_Dark_Overlay.png');
    this.load.image('Vignette_Overlay', './assets/Sprite_Overlay_Vignette.png');

    this.load.image('Background_Floor', './assets/Background_Floor.png');

    this.load.image('Wall_Perimeter_T', './assets/Wall_Perimeter_T.png');
    this.load.image('Wall_Perimeter_B', './assets/Wall_Perimeter_B.png');
    this.load.image('Wall_Perimeter_L', './assets/Wall_Perimeter_L.png');
    this.load.image('Wall_Perimeter_R', './assets/Wall_Perimeter_R.png');

    this.load.image('Wall_U_Perimeter_R', './assets/Wall_U_Perimeter_R.png');
    this.load.image('Wall_U_Perimeter_BL', './assets/Wall_U_Perimeter_BL.png');
    this.load.image('Wall_U_Perimeter_BR', './assets/Wall_U_Perimeter_BR.png');

    this.load.image('Wall_Foyer_L', './assets/Wall_Foyer_L.png');
    this.load.image('Wall_Foyer_R', './assets/Wall_Foyer_R.png');
    this.load.image('Wall_Foyer_BL', './assets/Wall_Foyer_BL.png');
    this.load.image('Wall_Foyer_BR', './assets/Wall_Foyer_BR.png');

    this.load.image('Wall_TBedroom_1', './assets/Wall_TBedroom_1.png');
    this.load.image('Wall_TBedroom_2', './assets/Wall_TBedroom_2.png');
    this.load.image('Wall_TBedroom_3', './assets/Wall_TBedroom_3.png');
    this.load.image('Wall_TBedroom_4', './assets/Wall_TBedroom_4.png');

    this.load.image('Wall_BabyRoom_1', './assets/Wall_BabyRoom_1.png');
    this.load.image('Wall_BabyRoom_2', './assets/Wall_BabyRoom_2.png');

    this.load.image('Wall_BBedroom_1', './assets/Wall_BBedroom_1.png');
    this.load.image('Wall_BBedroom_2', './assets/Wall_BBedroom_2.png');
    this.load.image('Wall_BBedroom_3', './assets/Wall_BBedroom_3.png');
    this.load.image('Wall_BBedroom_4', './assets/Wall_BBedroom_4.png');
    this.load.image('Wall_BBedroom_5', './assets/Wall_BBedroom_5.png');

    this.load.image('Wall_Library_1', './assets/Wall_Library_1.png');
    this.load.image('Wall_Library_2', './assets/Wall_Library_2.png');
    this.load.image('Wall_Library_3', './assets/Wall_Library_3.png');
    this.load.image('Wall_Library_4', './assets/Wall_Library_4.png');
    this.load.image('Wall_Library_5', './assets/Wall_Library_5.png');

    this.load.image('Wall_WritingRoom_1', './assets/Wall_WritingRoom_1.png');
    this.load.image('Wall_WritingRoom_2', './assets/Wall_WritingRoom_2.png');
    this.load.image('Wall_WritingRoom_3', './assets/Wall_WritingRoom_3.png');

    this.load.image('Wall_U_Bathroom_1', './assets/Wall_U_Bathroom_1.png');
    this.load.image('Wall_U_Bathroom_2', './assets/Wall_U_Bathroom_2.png');
    this.load.image('Wall_U_Bathroom_3', './assets/Wall_U_Bathroom_3.png');

    this.load.image('Wall_DiningRoom_1', './assets/Wall_DiningRoom_1.png');
    this.load.image('Wall_DiningRoom_2', './assets/Wall_DiningRoom_2.png');
    this.load.image('Wall_DiningRoom_3', './assets/Wall_DiningRoom_3.png');
    this.load.image('Wall_DiningRoom_4', './assets/Wall_DiningRoom_4.png');
    this.load.image('Wall_DiningRoom_5', './assets/Wall_DiningRoom_5.png');

    this.load.image('Wall_LivingSpace_1', './assets/Wall_LivingSpace_1.png');
    this.load.image('Wall_LivingSpace_2', './assets/Wall_LivingSpace_2.png');

    this.load.image('Wall_Bannister_T', './assets/Wall_Bannister_T.png');
    this.load.image('Wall_Bannister_L', './assets/Wall_Bannister_L.png');
    this.load.image('Wall_Bannister_R', './assets/Wall_Bannister_R.png');

    this.load.image('TopBedroom_Bed', './assets/environment/TopBedroom_Bed.png');
    this.load.image('TopBedroom_BesideTable_L', './assets/environment/TopBedroom_BedsideTable_L.png');
    this.load.image('TopBedroom_BedsideTable_R', './assets/environment/TopBedroom_BedsideTable_R.png');
    this.load.image('TopBedroom_Drawers', './assets/environment/TopBedroom_Drawers.png');
    this.load.image('TopBedroom_Wardrobe', './assets/environment/TopBedroom_Wardrobe.png');
    this.load.image('TopBedroom_Window', './assets/environment/TopBedroom_Window.png');

    this.load.image('TopBedroom_Bed', './assets/environment/TopBedroom_Bed.png');
    this.load.image('TopBedroom_BesideTable_L', './assets/environment/TopBedroom_BedsideTable_L.png');
    this.load.image('TopBedroom_BedsideTable_R', './assets/environment/TopBedroom_BedsideTable_R.png');
    this.load.image('TopBedroom_Drawers', './assets/environment/TopBedroom_Drawers.png');
    this.load.image('TopBedroom_Wardrobe', './assets/environment/TopBedroom_Wardrobe.png');
    this.load.image('TopBedroom_Window', './assets/environment/TopBedroom_Window.png');

    this.load.image('BottomBedroom_Bed', './assets/environment/BottomBedroom_Bed.png');
    this.load.image('BottomBedroom_BesideTable_L', './assets/environment/BottomBedroom_BedsideTable_L.png');
    this.load.image('BottomBedroom_BedsideTable_R', './assets/environment/BottomBedroom_BedsideTable_R.png');
    this.load.image('BottomBedroom_Drawers', './assets/environment/BottomBedroom_Drawers.png');
    this.load.image('BottomBedroom_Wardrobe', './assets/environment/BottomBedroom_Wardrobe.png');

    this.load.image('Library_Bookshelf_T1', './assets/environment/Library_Bookshelf_T1.png');
    this.load.image('Library_Bookshelf_T2', './assets/environment/Library_Bookshelf_T2.png');
    this.load.image('Library_Bookshelf_M1', './assets/environment/Library_Bookshelf_M1.png');
    this.load.image('Library_Bookshelf_M2', './assets/environment/Library_Bookshelf_M2.png');
    this.load.image('Library_Bookshelf_M3', './assets/environment/Library_Bookshelf_M3.png');
    this.load.image('Library_Bookshelf_M4', './assets/environment/Library_Bookshelf_M4.png');
    this.load.image('Library_Bookshelf_M5', './assets/environment/Library_Bookshelf_M5.png');
    this.load.image('Library_Bookshelf_B1', './assets/environment/Library_Bookshelf_B1.png');
    this.load.image('Library_Bookshelf_B2', './assets/environment/Library_Bookshelf_B2.png');
    this.load.image('Library_Table', './assets/environment/Library_Table.png');
    this.load.image('Library_Chair', './assets/environment/Library_Chair.png');
    this.load.image('Library_Window', './assets/environment/Library_Window.png');

    this.load.image('WritingRoom_Chair', './assets/environment/WritingRoom_Chair.png');
    this.load.image('WritingRoom_Table', './assets/environment/WritingRoom_Table.png');

    this.load.image('EnSuite_Shower', './assets/environment/EnSuite_Shower.png');
    this.load.image('EnSuite_Toilet', './assets/environment/EnSuite_Toilet.png');
    this.load.image('EnSuite_TowelRack', './assets/environment/EnSuite_TowelRack.png');
    this.load.image('EnSuite_Sink', './assets/environment/EnSuite_Sink.png');
    this.load.image('EnSuite_Window', './assets/environment/EnSuite_Window.png');
    //Static Image
    this.load.image('EnSuite_Bathmat', './assets/environment/EnSuite_Bathmat.png');

    this.load.image('Bathroom_Bath', './assets/environment/Bathroom_Bath.png');
    this.load.image('Bathroom_Toilet', './assets/environment/Bathroom_Toilet.png');
    this.load.image('Bathroom_Sink', './assets/environment/Bathroom_Sink.png');
    this.load.image('Bathroom_TowelRack', './assets/environment/Bathroom_TowelRack.png');
    //Static Image
    this.load.image('Bathroom_Bathmat', './assets/environment/Bathroom_Bathmat.png');

    this.load.image('DiningRoom_Table', './assets/environment/DiningRoom_Table.png');
    this.load.image('DiningRoom_Chair_T1', './assets/environment/DiningRoom_Chair_T1.png');
    this.load.image('DiningRoom_Chair_T2', './assets/environment/DiningRoom_Chair_T2.png');
    this.load.image('DiningRoom_Chair_T3', './assets/environment/DiningRoom_Chair_T3.png');
    this.load.image('DiningRoom_Chair_B1', './assets/environment/DiningRoom_Chair_B1.png');
    this.load.image('DiningRoom_Chair_B2', './assets/environment/DiningRoom_Chair_B2.png');
    this.load.image('DiningRoom_Chair_B3', './assets/environment/DiningRoom_Chair_B3.png');
    this.load.image('DiningRoom_Window_B1', './assets/environment/DiningRoom_Window_B1.png');
    this.load.image('DiningRoom_Window_B2', './assets/environment/DiningRoom_Window_B2.png');
    this.load.image('DiningRoom_Window_L1', './assets/environment/DiningRoom_Window_L1.png');

    this.load.image('Kitchen_Bin_T', './assets/environment/Kitchen_Bin_T.png');
    this.load.image('Kitchen_Bin_B', './assets/environment/Kitchen_Bin_B.png');
    this.load.image('Kitchen_Countertop_L', './assets/environment/Kitchen_Countertop_L.png');
    this.load.image('Kitchen_Countertop_T1', './assets/environment/Kitchen_Countertop_T1.png');
    this.load.image('Kitchen_Countertop_T2', './assets/environment/Kitchen_Countertop_T2.png');
    this.load.image('Kitchen_OverheadShelf_L', './assets/environment/Kitchen_OverheadShelf_L.png');
    this.load.image('Kitchen_OverheadShelf_R', './assets/environment/Kitchen_OverheadShelf_R.png');
    this.load.image('Kitchen_Range', './assets/environment/Kitchen_Range.png');
    this.load.image('Kitchen_Fridge', './assets/environment/Kitchen_Fridge.png');
    this.load.image('Kitchen_Freezer', './assets/environment/Kitchen_Freezer.png');
    this.load.image('Kitchen_Cabinet', './assets/environment/Kitchen_Cabinet.png');
    this.load.image('Kitchen_Table', './assets/environment/Kitchen_Table.png');
    this.load.image('Kitchen_Chair_T1', './assets/environment/Kitchen_Chair_T1.png');
    this.load.image('Kitchen_Chair_T2', './assets/environment/Kitchen_Chair_T2.png');
    this.load.image('Kitchen_Chair_M1', './assets/environment/Kitchen_Chair_M1.png');
    this.load.image('Kitchen_Chair_M2', './assets/environment/Kitchen_Chair_M2.png');
    this.load.image('Kitchen_Chair_B1', './assets/environment/Kitchen_Chair_B1.png');
    this.load.image('Kitchen_Chair_B2', './assets/environment/Kitchen_Chair_B2.png');
    this.load.image('Kitchen_Window', './assets/environment/Kitchen_Window.png');
}

function create() {
    gameOver = false;
    // this.graphics = this.add.graphics();

    //Configure world settings
    this.physics.world.setFPS(120);
    this.physics.world.setBounds(0, 0, 2400, 2000);

    //Define player controls
    controls = this.input.keyboard.addKeys({
        Crouch: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        Interact: Phaser.Input.Keyboard.KeyCodes.E,
        Fire: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    //Add floor image to background
    this.add.image(1200, 1000, 'Background_Floor');

    //Add wall sprites to the scene
    inspectableAssets = [];
    walls = this.physics.add.staticGroup();
    walls.create(0, 0, 'Wall_Perimeter_T').setOrigin(0,0).refreshBody();
    walls.create(0, 1984, 'Wall_Perimeter_B').setOrigin(0,0).refreshBody();
    walls.create(0, 0, 'Wall_Perimeter_L').setOrigin(0,0).refreshBody();
    walls.create(2376, 0, 'Wall_Perimeter_R').setOrigin(0,0).refreshBody();

    walls.create(1751, 0, 'Wall_U_Perimeter_R').setOrigin(0,0).refreshBody();
    walls.create(0, 1200, 'Wall_U_Perimeter_BL').setOrigin(0,0).refreshBody();
    walls.create(1296, 1200, 'Wall_U_Perimeter_BR').setOrigin(0,0).refreshBody();

    walls.create(787, 1200, 'Wall_Foyer_L').setOrigin(0,0).refreshBody();
    walls.create(1589, 1200, 'Wall_Foyer_R').setOrigin(0,0).refreshBody();
    walls.create(787, 1956, 'Wall_Foyer_BL').setOrigin(0,0).refreshBody();
    walls.create(1589, 1956, 'Wall_Foyer_BR').setOrigin(0,0).refreshBody();

    walls.create(576, 0, 'Wall_TBedroom_1').setOrigin(0,0).refreshBody();
    walls.create(576, 199, 'Wall_TBedroom_2').setOrigin(0,0).refreshBody();
    walls.create(428 , 289, 'Wall_TBedroom_3').setOrigin(0,0).refreshBody();
    walls.create(428, 305, 'Wall_TBedroom_4').setOrigin(0,0).refreshBody();

    walls.create(0, 396, 'Wall_BabyRoom_1').setOrigin(0,0).refreshBody();
    walls.create(428, 611, 'Wall_BabyRoom_2').setOrigin(0,0).refreshBody();

    walls.create(0, 800, 'Wall_BBedroom_1').setOrigin(0,0).refreshBody();
    walls.create(662, 800, 'Wall_BBedroom_2').setOrigin(0,0).refreshBody();
    walls.create(308, 800, 'Wall_BBedroom_3').setOrigin(0,0).refreshBody();
    walls.create(927, 800, 'Wall_BBedroom_4').setOrigin(0,0).refreshBody();
    walls.create(308, 1136, 'Wall_BBedroom_5').setOrigin(0,0).refreshBody();

    walls.create(1176, 0, 'Wall_Library_1').setOrigin(0,0).refreshBody();
    walls.create(1176, 235, 'Wall_Library_2').setOrigin(0,0).refreshBody();
    walls.create(1035, 265, 'Wall_Library_3').setOrigin(0,0).refreshBody();
    walls.create(1027, 265, 'Wall_Library_4').setOrigin(0,0).refreshBody();
    walls.create(1035, 499, 'Wall_Library_5').setOrigin(0,0).refreshBody();

    walls.create(1344, 499, 'Wall_WritingRoom_1').setOrigin(0,0).refreshBody();
    walls.create(1352, 800, 'Wall_WritingRoom_2').setOrigin(0,0).refreshBody();
    walls.create(1552, 800, 'Wall_WritingRoom_3').setOrigin(0,0).refreshBody();

    walls.create(1368, 949, 'Wall_U_Bathroom_1').setOrigin(0,0).refreshBody();
    walls.create(1376, 949, 'Wall_U_Bathroom_2').setOrigin(0,0).refreshBody();
    walls.create(1683, 949, 'Wall_U_Bathroom_3').setOrigin(0,0).refreshBody();

    walls.create(0, 1594, 'Wall_DiningRoom_1').setOrigin(0,0).refreshBody();
    walls.create(212, 1594, 'Wall_DiningRoom_2').setOrigin(0,0).refreshBody();
    walls.create(759, 1594, 'Wall_DiningRoom_3').setOrigin(0,0).refreshBody();
    walls.create(563, 1594, 'Wall_DiningRoom_4').setOrigin(0,0).refreshBody();
    walls.create(563, 1956, 'Wall_DiningRoom_5').setOrigin(0,0).refreshBody();

    walls.create(1775, 976, 'Wall_LivingSpace_1').setOrigin(0,0).refreshBody();
    walls.create(2176, 976, 'Wall_LivingSpace_2').setOrigin(0,0).refreshBody();

    walls.create(918 , 1330, 'Wall_Bannister_T').setOrigin(0,0).refreshBody();
    walls.create(918 , 1330, 'Wall_Bannister_L').setOrigin(0,0).refreshBody();
    walls.create(1471 , 1330, 'Wall_Bannister_R').setOrigin(0,0).refreshBody();
    
    walls.create(78, 223, 'TopBedroom_Bed').setOrigin(0,0).refreshBody();
    inspectableAssets.push(
        walls.create(32, 341, 'TopBedroom_BesideTable_L').setOrigin(0,0).refreshBody(),
        walls.create(224, 341, 'TopBedroom_BedsideTable_R').setOrigin(0,0).refreshBody(),
        walls.create(412, 26, 'TopBedroom_Drawers').setOrigin(0,0).refreshBody(),
        walls.create(45, 26, 'TopBedroom_Wardrobe').setOrigin(0,0).refreshBody(),
        walls.create(213, 17, 'TopBedroom_Window').setOrigin(0,0).refreshBody()
    );

    walls.create(560, 1029, 'BottomBedroom_Bed').setOrigin(0,0).refreshBody();
    inspectableAssets.push(
        walls.create(514, 1147, 'BottomBedroom_BesideTable_L').setOrigin(0,0).refreshBody(),
        walls.create(706, 1147, 'BottomBedroom_BedsideTable_R').setOrigin(0,0).refreshBody(),
        walls.create(882, 895, 'BottomBedroom_Drawers').setOrigin(0,0).refreshBody(),
        walls.create(877, 1048, 'BottomBedroom_Wardrobe').setOrigin(0,0).refreshBody()
    );

    inspectableAssets.push(
        walls.create(1324, 24, 'Library_Bookshelf_T1').setOrigin(0,0).refreshBody(),
        walls.create(1576, 24, 'Library_Bookshelf_T2').setOrigin(0,0).refreshBody(),
        walls.create(1324, 138, 'Library_Bookshelf_M1').setOrigin(0,0).refreshBody(),
        walls.create(1594, 138, 'Library_Bookshelf_M2').setOrigin(0,0).refreshBody(),
        walls.create(1324, 252, 'Library_Bookshelf_M3').setOrigin(0,0).refreshBody(),
        walls.create(1464, 252, 'Library_Bookshelf_M4').setOrigin(0,0).refreshBody(),
        walls.create(1636, 252, 'Library_Bookshelf_M5').setOrigin(0,0).refreshBody(),
        walls.create(1324, 366, 'Library_Bookshelf_B1').setOrigin(0,0).refreshBody(),
        walls.create(1541, 366, 'Library_Bookshelf_B2').setOrigin(0,0).refreshBody()
    );
    walls.create(1051, 325, 'Library_Table').setOrigin(0,0).refreshBody();
    walls.create(1141, 385, 'Library_Chair').setOrigin(0,0).refreshBody();
    walls.create(1457, 17, 'Library_Window').setOrigin(0,0).refreshBody();

    inspectableAssets.push(
        walls.create(1526, 586, 'WritingRoom_Chair').setOrigin(0,0).refreshBody(),
        walls.create(1479, 640, 'WritingRoom_Table').setOrigin(0,0).refreshBody()
    );

    inspectableAssets.push(
        walls.create(208, 824, 'EnSuite_Shower').setOrigin(0,0).refreshBody(),
        walls.create(22, 897, 'EnSuite_Toilet').setOrigin(0,0).refreshBody(),
        walls.create(49, 819, 'EnSuite_TowelRack').setOrigin(0,0).refreshBody(),
        walls.create(169, 1153, 'EnSuite_Sink').setOrigin(0,0).refreshBody(),
        walls.create(18, 1008, 'EnSuite_Window').setOrigin(0,0).refreshBody()
    );

    inspectableAssets.push(
        walls.create(1392, 1047, 'Bathroom_Bath').setOrigin(0,0).refreshBody(),
        walls.create(1685, 1149, 'Bathroom_Toilet').setOrigin(0,0).refreshBody(),
        walls.create(1704, 1007, 'Bathroom_Sink').setOrigin(0,0).refreshBody(),
        walls.create(1418, 968, 'Bathroom_TowelRack').setOrigin(0,0).refreshBody()
    );

    inspectableAssets.push(
        walls.create(202, 1700, 'DiningRoom_Chair_T1').setOrigin(0,0).refreshBody(),
        walls.create(269, 1707, 'DiningRoom_Chair_T2').setOrigin(0,0).refreshBody(),
        walls.create(340, 1699, 'DiningRoom_Chair_T3').setOrigin(0,0).refreshBody(),
        walls.create(212, 1848, 'DiningRoom_Chair_B1').setOrigin(0,0).refreshBody(),
        walls.create(276, 1861, 'DiningRoom_Chair_B2').setOrigin(0,0).refreshBody(),
        walls.create(349, 1850, 'DiningRoom_Chair_B3').setOrigin(0,0).refreshBody(),
        walls.create(104, 1976, 'DiningRoom_Window_B1').setOrigin(0,0).refreshBody(),
        walls.create(364, 1976, 'DiningRoom_Window_B2').setOrigin(0,0).refreshBody(),
        walls.create(18, 1759, 'DiningRoom_Window_L1').setOrigin(0,0).refreshBody()
    );
    walls.create(150, 1725, 'DiningRoom_Table').setOrigin(0,0).refreshBody();

    inspectableAssets.push(
        walls.create(535, 1364, 'Kitchen_Chair_T1').setOrigin(0,0).refreshBody(),
        walls.create(609, 1376, 'Kitchen_Chair_T2').setOrigin(0,0).refreshBody(),
        walls.create(502, 1414, 'Kitchen_Chair_M1').setOrigin(0,0).refreshBody(),
        walls.create(662, 1407, 'Kitchen_Chair_M2').setOrigin(0,0).refreshBody(),
        walls.create(555, 1459, 'Kitchen_Chair_B1').setOrigin(0,0).refreshBody(),
        walls.create(618, 1446, 'Kitchen_Chair_B2').setOrigin(0,0).refreshBody(),
        walls.create(569, 1220, 'Kitchen_Cabinet').setOrigin(0,0).refreshBody(),
        walls.create(483, 1218, 'Kitchen_Freezer').setOrigin(0,0).refreshBody(),
        walls.create(415, 1218, 'Kitchen_Fridge').setOrigin(0,0).refreshBody(),
        walls.create(171, 1224, 'Kitchen_Range').setOrigin(0,0).refreshBody(),
        walls.create(24, 1501, 'Kitchen_Bin_T').setOrigin(0,0).refreshBody(),
        walls.create(24, 1540, 'Kitchen_Bin_B').setOrigin(0,0).refreshBody(),
        walls.create(18, 1310, 'Kitchen_Window').setOrigin(0,0).refreshBody()
    );
    walls.create(524, 1394, 'Kitchen_Table').setOrigin(0,0).refreshBody();
    walls.create(79, 1225, 'Kitchen_Countertop_T1').setOrigin(0,0).refreshBody();
    walls.create(254, 1225, 'Kitchen_Countertop_T2').setOrigin(0,0).refreshBody();
    walls.create(24, 1223, 'Kitchen_Countertop_L').setOrigin(0,0).refreshBody();
    walls.create(16, 1216, 'Kitchen_OverheadShelf_L').setOrigin(0,0).refreshBody();
    walls.create(280, 1216, 'Kitchen_OverheadShelf_R').setOrigin(0,0).refreshBody();

    //Static Images
    this.add.image(170, 828, 'EnSuite_Bathmat').setOrigin(0,0);
    this.add.image(1461, 1103, 'Bathroom_Bathmat').setOrigin(0,0);


    this.wallRects = [];

    walls.getChildren().forEach(function(wall) {
        let rect = new Phaser.Geom.Rectangle(0,0,0,0);
        Phaser.Geom.Rectangle.CopyFrom(wall.body, rect);
        this.wallRects.push(rect);
    }.bind(this));

    //Create & configure custom player sprite/object
    player = new Player({scene:this, x:1200,y:1800}).setFrame(0).setSize(32, 32).setOffset(16, 16).setCollideWorldBounds(true);

    this.physics.add.collider(player, walls);

    //Instantiate & begin wave timer for the spawning of ghosts throughout the game session
    waveTimer = this.time.addEvent({
        callback:spawnGhosts,
        args:[],
        callbackScope:this,
        delay:60*1000,
        loop:true
    });

    //Add "post-procesing" effects to the scene/camera
    this.add.image(1200, 1000, 'Dark_Overlay').alpha = 0.5;
    this.add.image(600, 500, 'Vignette_Overlay').setScrollFactor(0,0);

    //Create & configure inspectable object instances
    for (let i = 0; i < inspectableAssets.length; i++) {
        new Inspectable({scene:this,x:inspectableAssets[i].getCenter().x,y:inspectableAssets[i].getCenter().y}).setScale(0.25).setVisible(false);
    }

    for (let i = 0; i < 5; i++) {
        selectInspectables();
    }

    //Create & configure crosshair sprite
    crosshair = this.physics.add.sprite(1200, 1750, 'Crosshair').setScale(0.15);

    crosshair.setCollideWorldBounds(true);
    this.physics.add.collider(crosshair, walls);

    //Handle pointer lock and cursor control when game window is clicked
    this.input.on('pointerdown', function(){ game.input.mouse.requestPointerLock(); });

    this.input.on('pointermove', function(pointer) {
        if (game.input.mouse.locked) {
            crosshair.x += pointer.movementX;
            crosshair.y += pointer.movementY;
        }
    }, this);

    //Configure camera settings
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 2400, 2000, true);
}

function update() {
    //Check whether game should be over
    if (!gameOver)  {
        //End game with a false victory condition if player's health is 0
        if (player.getHealth() == 0) {
            endGame(false);
        }

        //End game with a true victory condition if player finds all five evidence pieces in the level
        if (player.getEvidenceFound() >= 5) {
            endGame(true);
        }

        //Set player rotation to face crosshair.
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, crosshair.x, crosshair.y);

        player.setVelocity(0,0);

        /*
         * If the player is not holding the crouch key and the crosshair is positioned further than 75 units from the player's location 
         * then player moves in the direction of the crosshair (that they are facing)
         */
        if (!controls.Crouch.isDown && Utils.getDistance(player.x, player.y, crosshair.x, crosshair.y) > 50) {
            player.setVelocityX(Math.cos(player.rotation)*100);
            player.setVelocityY(Math.sin(player.rotation)*100);
        }

        /*
         * 1. Upon the player using the interact key, loop through instances of inspectable and check for overlap between it's sprite and the player's crosshair.
         * 2. If there is an overlap and player is within 100 units of the inspectable, it's interact function is called.
         */
        if (Phaser.Input.Keyboard.JustDown(controls.Interact)) {
            for (let i = 0; i < Inspectable.Instances.length; i++) {
                let inspectable = Inspectable.Instances[i];

                if ((crosshair.x-inspectable.x < 20 && crosshair.x-inspectable.x > -20) && (crosshair.y-inspectable.y < 20 && crosshair.y-inspectable.y > -20)) {
                    if (Utils.getDistance(player.x, player.y, inspectable.x, inspectable.y) < 75) {
                        inspectable.interact(player);
                    }
                }
            }
        }
        
        //Evaporator
        if (controls.Fire.isDown) {
            player.getEvaporator().fire();
            player.getEvaporator().getBeam().listenForIntersects(this.wallRects);

            for (let i = 0; i < Ghost.Instances.length; i++) {
                let ghost = Ghost.Instances[i];
                let ghostRectBody = ghost.rectBody;
                player.getEvaporator().getBeam().listenForIntersects([ghostRectBody], function() {
                    ghost.setHealth(-0.05);
                }, player.getEvaporator().getBeam());
            }
        }
        else {
            //Player has finished firing the evaporator, reset.
            if (player.getEvaporator().isFiring()) {
                player.getEvaporator().cleanUp();
            }
        }

        // Loop through inspectable instances and conditionally lerp it's sprite's alpha value relative to the player's distance.
        for (let i = 0; i < Inspectable.Instances.length; i++) {
            let inspectable = Inspectable.Instances[i];
            if (Utils.getDistance(player.x, player.y, inspectable.x, inspectable.y) < 100) {
                if (!inspectable.visible) {
                    inspectable.setVisible(true);
                }
                inspectable.alpha = Phaser.Math.Clamp(Phaser.Math.Linear(2, 0, Utils.getDistance(player.x, player.y, inspectable.x, inspectable.y)/100), 0, 1);
            }
            else {
                if (inspectable.visible) inspectable.setVisible(false);
            }
        }

        //Call update function of every ghost instance
        for (let i = 0; i < Ghost.Instances.length; i++) {
            Ghost.Instances[i].update(player);
        }
    }
}

//Wave spawning logic for ghosts.
function spawnGhosts() {
    //If there's 5 or more ghosts alive when function is called, do not continue.
    if (Ghost.Instances.length >= 5) {
        return;
    }

    //Array of spawn points - [X, Y] - 100 units outside of world bounds at all four corners.
    let spawns = [[-100,-100],[-100,2100],[2500,-100],[2500,2100]];
    let spawn;
    let x;
    let y;

    /*
     * Spawn X amount of ghosts with X being determined by the player's current sanity level when this function is called.
     * Sanity is rounded up to the nearest 10, e.g. 81 = 90. 100-90 = 10. 10 ghosts will be spawned.
     */

    for (i = 0; i < 100-(Math.ceil(player.getSanity() / 10) * 10); i++) {
        //Select a spawn point from the previously created array at random.
        spawn =  spawns[Math.floor(Math.random()*4)];
        x = spawn[0];
        y = spawn[1];

        /*
         * Create & configure ghost, delaying each spawn by 1 second multiplied by the current iteration value. 
         * e.g. i=9, ghost will spawn 9 seconds after this function is called.
         */
        this.time.delayedCall((1*1000) * i, function(x, y) {
            new Ghost({scene:this, x:x, y:y}).addColliderAndOverlap(player);
        }.bind(this), [x,y], this);
    }
}

function selectInspectables() {
    let inspectable = Inspectable.Instances[Math.floor(Math.random() * Inspectable.Instances.length)]
    
    if (inspectable.isActive()) {
        selectInspectables();
        return;
    }

    inspectable.setActive(true);
}

//Game end logic
function endGame(passed) {
    if (!passed) {
        //Loser
    }
    else {
        //Winner
    }
    player.getEvaporator().cleanUp();
    player.getSanityTimer().destroy();
    waveTimer.destroy();
    gameOver = true;
}