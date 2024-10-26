import { command } from './command';

export const commands = (commandsToGen, selectedIndex) =>
  commandsToGen.map((props, i) => {
    const li = command(props, i === selectedIndex);
    return li;
  });
