/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const map = this.game.add.tilemap('base')
    map.addTilesetImage('buch-outdoor')

    const base = map.createLayer('base')
    const roads = map.createLayer('roads')
    const water  = map.createLayer('water')

    // activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // const bannerText = 'Phaser + ES6 + Webpack = Frogger'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)

    this.setupControls()
  }

  setupControls () {
    this.controls = {
      UP: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      DOWN: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }

    this.controls.UP.onDown.add(_ => this.mushroom.move(0, -1))
    this.controls.DOWN.onDown.add(_ => this.mushroom.move(0, 1))
    this.controls.LEFT.onDown.add(_ => this.mushroom.move(-1, 0))
    this.controls.RIGHT.onDown.add(_ => this.mushroom.move(1, 0))
  }

  handleControls () {
    const { UP, DOWN, LEFT, RIGHT } = this.controls

    let x = 0
    let y = 0

    if (UP.isDown) y = -1
    else if (DOWN.isDown) y = 1
    else if (LEFT.isDown) x = -1
    else if (RIGHT.isDown) x = 1

    this.mushroom.move(x, y, true)
  }

  update () {
    // handle keyboard controls
    this.handleControls()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
