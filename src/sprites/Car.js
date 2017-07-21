import Phaser from 'phaser'

export default class CarSprite extends Phaser.Sprite {
  constructor (player, { game, x, y, asset = 'car-green', velocity = 100 }) {
    const carsAssets = [ 'car-red', 'car-green', 'car-blue', 'car-yellow' ]
    const rngAsset = game.rnd.between(0, 3)
    asset = carsAssets[rngAsset]

    super(game, x, y, asset)

    this.player = player

    this.anchor.setTo(1, 0)
    // this.scale.setTo(0.5, 0.5)

    // this.game.physics.arcade.enable(this)
    // this.game.physics.arcade.gravity.y = 200

    // this.mushroom.body.bounce.y = 0.95
    // this.body.collideWorldBounds = false

    this._velocity = velocity
  }

  move (x, y) {
    const xTo = x * this._velocity
    const yTo = y * this._velocity

    // this.x += xTo
    // this.y += yTo
    this.body.velocity.setTo(xTo, yTo)

    let facing

    if (xTo < 0) { // going left
      facing = 1
      if (this.x < 0) this.x = this.game.width + this.width
    } else { // going right
      facing = -1
      if (this.x > this.game.width) this.x = 0 + this.width
    }

    this.scale.setTo(facing, 1)
    // this.body.acceleration.setTo(xTo, yTo)
  }

  handleCarCollision () {
    this.resetPlayer()
  }

  update () {
    this.move(1, 0)
    this.game.physics.arcade.collide(this, this.player, this.handleCarCollision, null, this.player)
    this.game.debug.body(this)
  }
}
