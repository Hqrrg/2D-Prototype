class Evaporator {

    player;
    firing;
    beam;
    beamX2Multiplier;
    beamY2Multiplier;

    constructor(config) {
        this.player = config.player;
        this.firing = false;
        this.beam = new Beam({scene:config.scene, x:0, y:0, x1:-100, y1:-100, x2:-100, y2:-100, strokeColour:0xA8F3FF, player:config.player}).setVisible(false);
        this.beamX2Multiplier = 0;
        this.beamY2Multiplier = 0;
    }

    fire() {
        this.beam.geom.x1 = this.player.x + Math.cos(this.player.rotation)*35;
        this.beam.geom.y1 = this.player.y + Math.sin(this.player.rotation)*35;
        this.beam.geom.x2 = this.player.x + Math.cos(this.player.rotation)*Phaser.Math.Clamp(this.beamX2Multiplier+=5, 0, 200);
        this.beam.geom.y2 = this.player.y + Math.sin(this.player.rotation)*Phaser.Math.Clamp(this.beamY2Multiplier+=5, 0, 200);

        this.player.setVelocity(0,0);

        if (!this.firing) {
            this.player.setFrame(1);
            this.beam.setVisible(true);
            this.firing = true;
        }
        return this;
    }

    cleanUp() {
        this.beamX2Multiplier = 0;
        this.beamY2Multiplier = 0;
        this.player.setFrame(0);
        this.beam.reset();
        this.firing = false;
    }

    isFiring() {
        return this.firing;
    }

    getBeam() {
        return this.beam;
    }

}

class Beam extends Phaser.GameObjects.Line {

    blocked;
    player;

    constructor(config) {
        super(config.scene, config.x, config.y, config.x1, config.y1, config.x2, config.y2, config.strokeColour);
        this.player = config.player;
        this.blocked = false;

        config.scene.add.existing(this);

        this.setLineWidth(1,5);
        this.setAlpha(0.5);
    }
    
    reset() {
        this.setVisible(false);
        this.x = 0;
        this.y = 0;
        this.geom.x1 = -100;
        this.geom.y1 = -100;
        this.geom.x2 = -100;
        this.geom.y2 = -100;
        return this;
    }

    listenForIntersects(otherGeoms, action = null, context = null) {
        for (let i = 0; i < otherGeoms.length; i++) {
            let otherGeom = otherGeoms[i];
            for (let l = Phaser.Geom.Line.Length(this.geom); l >= 0; l--) {
                if (Phaser.Geom.Intersects.LineToRectangle(this.geom, otherGeom)) {
                    if (action != null) action.call(context, otherGeom);
                    this.geom.x2 -= Math.cos(this.player.rotation);
                    this.geom.y2 -= Math.sin(this.player.rotation);
                }
            }
        }
    }

    isBlocked() {
        return this.blocked;
    }

    setBlocked(blocked) {
        this.blocked = blocked;
        return this;
    }
}