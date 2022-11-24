class Ghost extends Phaser.Physics.Arcade.Sprite {

    static Instances = [];

    config;

    rectBody;
    health;

    constructor(config) {
        super(config.scene, config.x, config.y, 'Ghost');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        this.config = config;
        this.health = 100;

        this.setScale(0.85).setSize(48, 48).setOffset(8, 8).setBounce(2);
        
        this.rectBody = new Phaser.Geom.Rectangle(0,0,0,0);
        Phaser.Geom.Rectangle.CopyFrom(this.body, this.rectBody);

        Ghost.Instances.push(this);
    }

    //Logic to be called every tick.
    update(player) {
        if (this.health == 0) {
            this.destroyInstance();
            return;
        }
        //Calculate rotation angle to face the player & apply velocity in that direction.
        let rotation = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        this.setVelocityX(Math.cos(rotation)*100);
        this.setVelocityY(Math.sin(rotation)*100);
        this.rectBody.x = this.body.x;
        this.rectBody.y = this.body.y;
        return this;
    }

    addColliderAndOverlap(player) {
        //Add an overlap listener between this ghost instance and the player.
        this.config.scene.physics.add.overlap(player, this, this.damagePlayer, null, this);
        
        //Add a collision listener between this ghost instance and every other ghost instance.
        for (let i = 0; i < Ghost.Instances.length; i++) {
            this.config.scene.physics.add.collider(this, Ghost.Instances[i]);
        }
        return this;
    }

    //Deduct 10 health from the player and then destroy this instance.
    damagePlayer(player) {
        player.addHealth(-10);
        this.destroyInstance();
    }

    //Destroy instance in game world and remove from instance array.
    destroyInstance() {
        this.rectBody.setEmpty();

        Ghost.Instances.splice(Ghost.Instances.indexOf(this), 1);
        this.destroy();
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = Phaser.Math.Clamp(this.health + health, 0, 100);
        return this;
    }
}
