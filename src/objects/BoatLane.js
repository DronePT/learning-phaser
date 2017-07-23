// npm packages
import Phaser from 'phaser'

// our packages
import Boat from './../sprites/Boat'

export default class BoatLane extends Phaser.Group {
  constructor (game, player, {
    nrOfBoats = 1,
    lane = 1,
    direction = 1,
    velocity = 0
  }) {
    // new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    super(game, null, 'BoatLane', false, true, Phaser.Physics.ARCADE)

    // this.game = game
    this.player = player

    this.boats = []
    this.lane = lane
    this.nrOfBoats = nrOfBoats
    this.direction = direction

    this.velocity = velocity > 0
      ? velocity
      : (Math.random() * 400 + 100)

    this.spacing = Math.floor(this.game.width / nrOfBoats)

    for (let i = 0; i < nrOfBoats; i++) this.addBoat(i)

    this.setAll('body.collideWorldBounds', false)
  }

  addBoat (boatIndex) {
    const { lane, direction, spacing, player } = this

    // create boat sprite
    const boat = new Boat(player, {
      game: this.game,
      x: boatIndex * spacing,
      y: this.game.world.height - 32 * (lane + 1),
      velocity: this.velocity * direction
    })

    this.add(boat)
  }
}
