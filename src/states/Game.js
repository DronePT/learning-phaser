/* globals __DEV__ */
import Phaser from 'phaser'

// sprites
import Mushroom from './../sprites/Mushroom'
import Car from './../sprites/Car'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    const map = this.game.add.tilemap('city')
    map.addTilesetImage('city')

    const base = map.createLayer('base')
    const roads = map.createLayer('garden')
    const water  = map.createLayer('road')

    //  add player/mushroom

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)

    // this.car1 = new Car({
    //   game: this.game,
    //   x: 0,
    //   y: this.world.height - 32 * 1,
    //   velocity: Math.random() * 400 + 100
    // })

    // this.game.add.existing(this.car1)

    this.addCar(1)
    this.addCar(2)
    this.addCar(3)
    this.addCar(4)

    this.setupControls()
  }

  addCar (lane) {
    const car = new Car({
      game: this.game,
      x: 0,
      y: this.world.height - 32 * lane,
      velocity: Math.random() * 400 + 100
    })

    this.game.add.existing(car)
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
