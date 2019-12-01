import { Git } from '../models';

export function git(): Git {
  const push = (): void => {
    console.log('push');
  };

  const pull = (): void => {
    console.log('pull');
  };

  return {
    push,
    pull
  };
}
