export class Status {
  constructor(
    private statusText: string
  ) { }

  isQueued(): boolean { return this.statusText === 'queued'; }
  isInProgress(): boolean { return this.statusText === 'in-progress'; }
  isSucceeded(): boolean { return this.statusText === 'succeeded'; }
  isFailed(): boolean { return this.statusText === 'failed'; }
  isErrored(): boolean { return this.statusText === 'errored'; }
  isCanceled(): boolean { return this.statusText === 'canceled'; }
  isTerminal(): boolean { return !this.isQueued() && !this.isInProgress(); }
}
