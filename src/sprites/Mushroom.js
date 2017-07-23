import Phaser from 'phaser'

import { GRID, NEXT_JUMP_TIME } from './../config'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1)
    this.scale.setTo(0.5, 0.5)

    this.game.physics.arcade.enable(this)
    // this.game.physics.arcade.gravity.y = 200

    // this.mushroom.body.bounce.y = 0.95
    this.body.collideWorldBounds = true
    this.body.immovable = true

    this.resetMovement()
    this.lastMove = 0
    this.deaths = 0

    this.ripText = this.game.add.text(this.game.world.centerX, this.game.height /
      2, 'RiP')
    this.ripText.font = 'Bangers'
    this.ripText.padding.set(10, 16)
    this.ripText.fontSize = 40
    this.ripText.fill = '#0066cc'
    this.ripText.smoothed = false
    this.ripText.anchor.setTo(0.5)
    this.ripText.visible = false
    this.ripText.fixedToCamera = true
    this.ripTextTimer = 0
  }

  resetMovement () {
    this.moveDirection = { x: null, y: null }
    this.moveTo = { x: null, y: null }
    this.body.velocity.setTo(0)
  }

  resetPlayer () {
    // this.game.camera.flash(0xff0000, 250)
    this.game.camera.shake(0.02, 100)
    this.x = this.game.world.centerX
    this.y = this.game.world.height
    this.deaths += 1

    this.showGameOver()
  }

  showGameOver () {
    clearTimeout(this.ripTextTimer)

    this.ripText.text = `RIP #${this.deaths}`
    this.ripText.visible = true

    this.ripTextTimer = setTimeout(
      () => { this.ripText.visible = false }
      , 2000
    )
  }

  move (x, y, isPressing = false) {
    if (isPressing && this.game.time.now < this.lastMove) return

    this.lastMove = this.game.time.now + NEXT_JUMP_TIME

    this.x += x * GRID
    this.y += y * GRID
  }

  update () {}
}
