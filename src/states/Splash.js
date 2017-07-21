import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')

    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    // load cars
    this.load.image('car-red', 'assets/images/car_red.png')
    this.load.image('car-green', 'assets/images/car_green.png')
    this.load.image('car-blue', 'assets/images/car_blue.png')
    this.load.image('car-yellow', 'assets/images/car_yellow.png')

    this.load.tilemap('city', './assets/tilemap/city.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('city', './assets/tilemap/city.png')
  }

  create () {
    this.state.start('Game')
  }
}
