class Inspectable extends Phaser.Physics.Arcade.Sprite {

    static Instances = [];

    active;

    constructor(config) {
        super(config.scene, config.x, config.y, 'Inspectable');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        this.body = new Phaser.Physics.Arcade.StaticBody(config.scene.physics.world, this);
        this.alpha = 0;
        this.active = false;

        Inspectable.Instances.push(this);
    }
    
    interact(player) {
        //If this inspectable instance is active, add to player's evidenceFound and award sanity.
        if (this.isActive()) {
            player.addEvidenceFound(1);
            player.addSanity(40);
        }
        //..Otherwise deduct 5 sanity from the player.
        else {
            player.addSanity(-5);
        }
        //Update player's user interface with new updated sanity value.
        player.updateUserInterface();
        //Destroy this sprite instance in the game world.
        this.destroy();
        //Remove this instance from the class instances array.
        Inspectable.Instances.splice(Inspectable.Instances.indexOf(this), 1);
    }

    isActive() {
        return this.active;
    }

    setActive(active) {
        this.active = active;
        return this;
    }
}