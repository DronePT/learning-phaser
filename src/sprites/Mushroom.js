import Phaser from 'phaser'

import { GRID, NEXT_JUMP_TIME } from './../config'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.setTo(0.5, 0.5)

    this.game.physics.arcade.enable(this)
    // this.game.physics.arcade.gravity.y = 200

    // this.mushroom.body.bounce.y = 0.95
    this.body.collideWorldBounds = true

    this.lastMove = 0
  }

  move (x, y, isPressing = false) {
    if (isPressing && this.game.time.now < this.lastMove) return

    this.lastMove = this.game.time.now + NEXT_JUMP_TIME

    const xTo = x * GRID
    const yTo = y * GRID

    this.x += xTo
    this.y += yTo
    // this.body.velocity.setTo(xTo, yTo)
    // this.body.acceleration.setTo(xTo, yTo)
  }

  update () {}
}
