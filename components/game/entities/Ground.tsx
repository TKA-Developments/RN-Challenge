import React from 'react';
import { Image, View } from 'react-native';
import Matter from 'matter-js';
import { Position, Size } from '../type';

const groundImage = require('../../../assets/images/mario/ground.png');

const Ground = (
  {
    size,
    body,
  }:
    {
      size: Size,
      body: Matter.Body
    },
) => {
  const centerX = body.position.x - size.width / 2;
  const centerY = body.position.y - size.height / 2;

  return (
    <View
      style={[
        {
          position: 'absolute',
          left: centerX,
          top: centerY,
          width: size.width,
          height: size.height,
        },
      ]}
    >
      <Image
        style={{
          width: size.width,
          height: size.height,
        }}
        source={groundImage}
      />
    </View>
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
    {
      isStatic: true,
      friction: 0,
    },
  );

  return {
    body,
    size,
    renderer: <Ground size={size} body={body}/>,
  };
};
