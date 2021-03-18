import Matter from 'matter-js';
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import Entities from '../entities';

export default (entities: ReturnType<typeof Entities>, {
  time,
  touches,
}: GameEngineUpdateEventOptionType) => {
  const { engine }: { engine: Matter.Engine } = entities.physics;

  const anyTouch = touches.some((touch) => touch.type === 'start');
  // Collision detection workaround
  if (anyTouch && entities.mario.body.position.y > 340) {
    Matter.Body.setVelocity(entities.mario.body, {
      x: 0,
      y: -10,
    });
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};
