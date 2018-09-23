import { Build } from './build';

export class Queue {
  constructor(
    public activeBuilds: Build[],
    public queuedBuilds: Build[]
  ) { }
}
