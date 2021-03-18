import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import SpriteSheet from 'rn-sprite-sheet';
import { Position, Size } from '../type';

const marioSpritesheet = require('../../../assets/images/mario/spritesheet.png');

const Mario = (
  {
    size,
    body,
  }:
    {
      size: Size,
      body: Matter.Body
    },
) => {
  const ref = useRef<SpriteSheet>(null);
  const centerX = body.position.x - size.width / 2;
  const centerY = body.position.y - size.height / 2;

  useEffect(() => {
    ref.current?.play({
      type: 'walk',
      fps: 6,
      loop: true,
    });
  }, [ref]);

  return (
    <SpriteSheet
      ref={ref}
      source={marioSpritesheet}
      columns={5}
      rows={2}
      width={size.width}
      height={size.height}
      viewStyle={{
        position: 'absolute',
        left: centerX,
        top: centerY,
        width: size.width,
        height: size.height,
      }}
      // imageStyle={{ marginTop: -1 }}
      animations={{
        walk: [1, 2, 3, 4],
        jump: [5],
        fall: [6],
      }}
    />
  );
};

export default (
  world: Matter.World,
  pos: Position,
  size: Size,
) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
  );
  Matter.World.add(world, [body]);

  return {
    body,
    size,
    renderer: <Mario size={size} body={body}/>,
  };
};
