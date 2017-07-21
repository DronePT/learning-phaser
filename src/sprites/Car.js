import Phaser from 'phaser'

import { GRID } from './../config'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset = 'car', velocity = 100 }) {
    super(game, x, y, asset)
    this.anchor.setTo(1, 1)
    // this.scale.setTo(0.5, 0.5)

    this.game.physics.arcade.enable(this)
    // this.game.physics.arcade.gravity.y = 200

    // this.mushroom.body.bounce.y = 0.95
    this.body.collideWorldBounds = false

    this._velocity = velocity
  }

  move (x, y) {
    const xTo = x * this._velocity
    const yTo = y * this._velocity

    // this.x += xTo
    // this.y += yTo
    this.body.velocity.setTo(xTo, yTo)

    let facing

    if (x < 0) { // going left
      facing = 1
    } else { // going right
      facing = -1
      if (this.x > this.game.width) {
        this.x = 0 + this.width
      }
    }

    this.scale.setTo(facing, 1)
    // this.body.acceleration.setTo(xTo, yTo)
  }

  update () {
    this.move(1, 0)
  }
}
