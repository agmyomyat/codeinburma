import * as migration_20241223_160139_init from './20241223_160139_init';

export const migrations = [
  {
    up: migration_20241223_160139_init.up,
    down: migration_20241223_160139_init.down,
    name: '20241223_160139_init'
  },
];
