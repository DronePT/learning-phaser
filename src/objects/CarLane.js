// npm packages
import Phaser from 'phaser'

// our packages
import Car from './../sprites/Car'

export default class CarLane extends Phaser.Group {
  constructor (game, player, {
    numberOfCars = 1,
    lane = 1,
    direction = 1,
    velocity = 0
  }) {
    // new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    super(game, null, 'CarLane', false, true, Phaser.Physics.ARCADE)

    // this.game = game
    this.player = player

    this.cars = []
    this.lane = lane
    this.numberOfCars = numberOfCars
    this.direction = direction

    this.velocity = velocity > 0
      ? velocity
      : (Math.random() * 400 + 100)

    this.spacing = Math.floor(this.game.width / numberOfCars)

    for (let i = 0; i < numberOfCars; i++) this.addCar(i)

    this.setAll('body.collideWorldBounds', false)
  }

  addCar (carIndex) {
    const { lane, direction, spacing, player } = this

    // create car sprite
    const car = new Car(player, {
      game: this.game,
      x: carIndex * spacing,
      y: this.game.world.height - 32 * (lane + 1),
      velocity: this.velocity * direction
    })

    this.add(car)
  }
}
