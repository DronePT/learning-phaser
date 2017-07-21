/* globals __DEV__ */
import Phaser from 'phaser'

// sprites
import Mushroom from './../sprites/Mushroom'
import CarLane from './../objects/CarLane'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 512, 512)

    const map = this.game.add.tilemap('city')
    map.addTilesetImage('city')

    const base = map.createLayer('base')
    const roads = map.createLayer('garden')
    const water  = map.createLayer('road')

    this.carLanes = []

    this.addPlayer()
    this.addCars()
    this.setupControls()
  }

  addPlayer () {
    this.player = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height,
      asset: 'mushroom'
    })

    this.game.add.existing(this.player)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    // Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1
  }

  addCars () {
    const { game, player, handleCarCollision } = this
    const lanes = [
      { numberOfCars: 4, lane: 1, direction: 1, velocity: 100, handleCarCollision },
      { numberOfCars: 1, lane: 2, direction: 1, velocity: 350, handleCarCollision },
      { numberOfCars: 3, lane: 3, direction: -1, velocity: 250, handleCarCollision },
      { numberOfCars: 2, lane: 4, direction: -1, velocity: 200, handleCarCollision }
    ]

    for (let lane of lanes) {
      const carLane = this.game.add.existing(new CarLane(game, player, lane))
      this.carLanes.push(carLane)
    }
  }

  setupControls () {
    this.controls = {
      UP: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      DOWN: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }

    this.controls.UP.onDown.add(_ => this.player.move(0, -1))
    this.controls.DOWN.onDown.add(_ => this.player.move(0, 1))
    this.controls.LEFT.onDown.add(_ => this.player.move(-1, 0))
    this.controls.RIGHT.onDown.add(_ => this.player.move(1, 0))
  }

  handleControls () {
    const { UP, DOWN, LEFT, RIGHT } = this.controls

    let x = 0
    let y = 0

    if (UP.isDown) y = -1
    else if (DOWN.isDown) y = 1
    else if (LEFT.isDown) x = -1
    else if (RIGHT.isDown) x = 1

    this.player.move(x, y, true)
  }

  update () {
    // handle keyboard controls
    this.handleControls()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)

      // this.game.debug.body(this.player)

      // for (let carLane of this.carLanes) {
      //   for (let car of carLane.cars) {
      //     this.game.debug.body(car)
      //   }
      // }
    }
  }
}
