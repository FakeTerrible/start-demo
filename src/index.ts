import createBackground from './gameObjects/background';
import createBasketFront from './gameObjects/board/basketFront';
import createBoard from './gameObjects/board/board';
import createBall from './gameObjects/ball';
import createBtn from './gameObjects/btn';
import createBgSound from './gameObjects/bgSound';
import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';
import { SoundSystem } from "@eva/plugin-sound";

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1484,
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
    new SoundSystem(),
  ],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;

const pos = {
  x: 500,
  y: 1100,
};

const bgSound = createBgSound();

const ball = createBall(pos);
const animation = ball.addComponent(new Transition());
animation.group = {
  idle: [
    {
      name: 'scale.x',
      component: ball.transform,
      values: [
        {
          time: 0,
          value: 1,
          tween: 'ease-out'
        },
        {
          time: 300,
          value: 1.2,
          tween: 'ease-in'
        },
        {
          time: 600,
          value: 1
        }
      ]
    },
    {
      name: 'scale.y',
      component: ball.transform,
      values: [
        {
          time: 0,
          value: 1,
          tween: 'ease-out'
        },
        {
          time: 300,
          value: 1.2,
          tween: 'ease-in'
        },
        {
          time: 600,
          value: 1
        }
      ]
    }
  ],
  move: [
    {
      name: 'position.x',
      component: ball.transform,
      values: [
        {
          time: 0,
          value: 500,
          tween: 'ease-in'
        },
        {
          time: 300,
          value: 150,
          tween:'ease-out' 
        },
        {
          time: 600,
          value: 170,
          tween: 'linear'
        },
        {
          time: 700,
          value: 500,
          tween: 'linear'
        },
      ]
    },
    {
      name: 'position.y',
      component: ball.transform,
      values: [
        {
          time: 0,
          value: 1100,
          tween: 'ease-out'
        },
        {
          time: 300,
          value: 710,
          tween:'ease-in'
        },
        {
          time: 600,
          value: 1100,
          tween: 'linear'
        },
        {
          time: 700,
          value: 1100,
          tween: 'linear'
        },
      ]
    }
  ]
}



const { basetFront, playAnim } = createBasketFront();
const btn = createBtn({
  text: '投球',
  transform: {
    position: {
      x: 0,
      y: -120,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  },
  callback: () => {
    animation.play('move', 1)
    animation.on('finish', name => {
      name === 'move' && animation.play('idle', 5)
    })

    
    
  },
});

game.scene.addChild(createBackground());
game.scene.addChild(createBoard());
game.scene.addChild(bgSound);
game.scene.addChild(ball);
game.scene.addChild(basetFront);
game.scene.addChild(btn);

window.playAnim = playAnim;
window.game = game;
