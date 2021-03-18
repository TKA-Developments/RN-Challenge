import Matter from 'matter-js';
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import Entities from '../entities';

export default (entities: ReturnType<typeof Entities>, {
  time,
}: GameEngineUpdateEventOptionType) => {
  const { engine }: { engine: Matter.Engine } = entities.physics;
  Matter.Engine.update(engine, time.delta);
  return entities;
};
