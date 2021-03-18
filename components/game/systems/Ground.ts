import Matter from 'matter-js';
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import { Dimensions } from 'react-native';

export default (entities: object, {
  time,
}: GameEngineUpdateEventOptionType) => {
  // @ts-ignore
  const { engine }: { engine: Matter.Engine } = entities.physics;
  const centerWindowX = Dimensions.get('screen').width / 2;

  for (let i = 1; i <= 6; i += 1) {
    // @ts-ignore
    const body = entities[`ground${i}`].body as Matter.Body;
    Matter.Body.translate(body, {
      x: -0.1 * time.delta,
      y: 0,
    });
    if (body.position.x < centerWindowX + -250) {
      Matter.Body.setPosition(body, {
        x: centerWindowX + 112 * 2 + (body.position.x - -250),
        y: 400,
      });
    }
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};
