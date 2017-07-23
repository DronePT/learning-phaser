/* globals __DEV__ */
import Phaser from 'phaser'

// sprites
import Mushroom from './../sprites/Mushroom'
import CarLane from './../objects/CarLane'
import BoatLane from './../objects/BoatLane'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // activate physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 512, 960)

    this.carLanes = []
    this.boatLanes = []

    // add objects to game
    this.map = this.game.add.tilemap('map1')
    this.map.addTilesetImage('city')

    this.mapLayers = {
      lights: this.map.createLayer('lights'),
      safezone: this.map.createLayer('safezone'),
      roadsigns: this.map.createLayer('roadsigns'),
      roadlane: this.map.createLayer('roadlane'),
      water: this.map.createLayer('waterlane')
    }

    // this.mapLayers.water.debug = true
    this.map.setCollisionBetween(1040, 1041, true, this.mapLayers.water, true)

    console.warn('this.mapLayers.water', this.mapLayers.water)

    this.river = new Phaser.Rectangle(
      0,
      this.world.height - (32 * 11),
      this.world.width,
      4 * 32
    )

    this.addBoats()
    this.addCars()
    this.addPlayer()
    this.setupControls()
  }

  addPlayer () {
    this.player = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height - 32 * 6,
      asset: 'mushroom'
    })

    this.game.add.existing(this.player)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  addBoats () {
    const { game, player } = this
    const lanes = [
      { nrOfBoats: 5, lane: 7, direction: 1, velocity: 50 },
      { nrOfBoats: 2, lane: 8, direction: -1, velocity: 175 },
      { nrOfBoats: 1, lane: 9, direction: 1, velocity: 125 },
      { nrOfBoats: 4, lane: 10, direction: -1, velocity: 100 }
    ]

    for (let lane of lanes) {
      const boatLane = this.game.add.existing(new BoatLane(game, player, lane))
      this.boatLanes.push(boatLane)
    }
  }

  addCars () {
    const { game, player } = this
    const lanes = [
      { numberOfCars: 4, lane: 1, direction: 1, velocity: 100 },
      { numberOfCars: 1, lane: 2, direction: 1, velocity: 350 },
      { numberOfCars: 3, lane: 3, direction: -1, velocity: 250 },
      { numberOfCars: 2, lane: 4, direction: -1, velocity: 200 }
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

  resetGame () {
    this.player.resetPlayer()
  }

  checkCarCollision () {
    this.game.physics.arcade.collide(this.player, this.carLanes, this.resetGame, null, this)
  }

  checkOverRiver () {
      // - 14*32 (height: 8 * 32)
    const boundsA = this.player.getBounds(false)
    const boundsB = this.river

    console.warn('rect?', boundsA.y, boundsB.y)

    return Phaser.Rectangle.intersects(boundsA, boundsB)
  }

  checkOverlap (spriteA, spriteB) {
    const boundsA = spriteA.getBounds()
    const boundsB = spriteB.getBounds()

    return Phaser.Rectangle.intersects(boundsA, boundsB)
  }

  update () {
    // handle keyboard controls
    this.handleControls()
    this.checkCarCollision()

    console.warn(this.checkOverRiver())
    // this.game.physics.arcade.collide(this.player, this.mapLayers.water, this.resetGame, null, this)
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mapLayers.water, 32, 32)
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.rectangle(this.river, 'rgba(255, 0, 0, .25)')

      // this.game.debug.body(this.player, 'rgba(255, 0, 0, .25)')
      // for (let carLane of this.carLanes) {
      //   for (let car of carLane.cars) {
      //     this.game.debug.body(car)
      //   }
      // }
    }
  }
}
