import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
import PathDrawingScene from './scenes/PathDrawingScene '

const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PathDrawingScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true
    }
  },
  plugins: {
    scene: [
      {
        key: SpinePlugin.name,
        plugin: SpinePlugin,
        mapping: 'spine'
      },
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
      }
    ]
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
