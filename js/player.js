class Player extends Phaser.Physics.Arcade.Sprite {

    parent;

    health;
    sanity;
    evidenceFound;
    evaporator;

    playerInfoContainer;
    evidenceContainer;
    healthText;
    sanityText;
    evidenceText;

    sanityTimer;

    constructor(config) {
        super(config.scene, config.x, config.y, 'Player');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        this.parent = config.scene;
        
        //Assign player properties
        this.health = 100;
        this.sanity = 100;
        this.evidenceFound = 0;
        this.evaporator = new Evaporator({player:this, scene:config.scene});
        //Instantiate & begin sanity timer that deducts 1 sanity point from the player every 10 seconds.
        this.sanityTimer = config.scene.time.addEvent({
            callback:this.addSanity,
            args:[-1],
            callbackScope:this,
            delay:10*1000,
            loop:true
        });
        //Update the user interface.
        this.updateUserInterface();
    }

    getHealth() {
        return this.health;
    }

    getSanity() {
        return this.sanity;
    }

    getSanityTimer() {
        return this.sanityTimer;
    }

    getEvidenceFound() {
        return this.evidenceFound;
    }

    getEvaporator() {
        return this.evaporator;
    }

    //Perform addition operation on health and clamp the final value to a min of 0 and a max of 100 before assigning.
    addHealth(amount) {
        this.health = Phaser.Math.Clamp(this.health + amount, 0, 100);
        this.updateUserInterface();
        return this;
    }

    //Perform addition operation on sanity and clamp the final value to a min of 0 and a max of 100 before assigning.
    addSanity(amount) {
        this.sanity = Phaser.Math.Clamp(this.sanity + amount, 0, 100);
        this.updateUserInterface();
        return this;
    }

    addEvidenceFound(amount) {
        this.evidenceFound+=amount;
        return this;
    }

    //Pause or resume the sanity drain timer.
    setSanityTimerPaused(bool) {
        if (this.sanityTimer != null) this.sanityTimer.paused = bool;
        return this;
    }

    //All logic pertaining to the player's user interface.
    updateUserInterface() {
        if (this.playerInfoContainer == null) {
            this.healthText = this.parent.add.text(0, 0, 'Health: ' + this.health);
            this.sanityText = this.parent.add.text(0, 25, 'Sanity: ' + this.sanity);

            this.playerInfoContainer = this.parent.add.container(25, 25, [
                this.healthText,
                this.sanityText
            ]);
            this.playerInfoContainer.setScrollFactor(0,0);
        }
        if (this.evidenceContainer == null) {
            this.evidenceText = this.parent.add.text(0, 25, 'Evidence Found: ' + this.evidenceFound);

            
            this.evidenceContainer = this.parent.add.container(975, 25, [
                this.evidenceText
            ]);
            this.evidenceContainer.setScrollFactor(0,0);
        }
        this.healthText.setText('Health: ' + this.health);
        this.sanityText.setText('Sanity: ' + this.sanity);
        this.evidenceText.setText('Evidence Found: ' + this.evidenceFound);
        
    }
}