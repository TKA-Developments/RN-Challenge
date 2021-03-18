import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import Mario from './Mario';
import Ground from './Ground';

Matter.Common.isElement = () => false;

export default () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  world.gravity.y = 0.25;

  const centerWindowX = Dimensions.get('screen').width / 2;

  const mario = Mario(world, {
    x: centerWindowX,
    y: 0,
  }, {
    height: 50,
    width: 25,
  });
  const grounds = [
    Ground(world, {
      x: centerWindowX,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
    Ground(world, {
      x: centerWindowX + 112,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
    Ground(world, {
      x: centerWindowX + 112 * 2,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
    Ground(world, {
      x: centerWindowX + -112,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
    Ground(world, {
      x: centerWindowX + -112 * 2,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
    Ground(world, {
      x: centerWindowX + 112 * 3,
      y: 400,
    }, {
      width: 112,
      height: 32,
    }),
  ];

  const groundCollider = Matter.Bodies.rectangle(
    centerWindowX,
    400,
    Dimensions.get('screen').width,
    32,
    {
      isStatic: true,
      friction: 0,
    },
  );

  Matter.World.add(world, [groundCollider]);

  return {
    physics: {
      engine,
      world,
    },
    mario,
    ground1: grounds[0],
    ground2: grounds[1],
    ground3: grounds[2],
    ground4: grounds[3],
    ground5: grounds[4],
    ground6: grounds[5],
  };
};
