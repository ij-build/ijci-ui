import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

export class RefreshComponent implements OnInit, OnDestroy {
  interval = 5000;
  timerSubscription: Subscription;

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.stopRefreshing();
  }

  protected load() {
    this.timerSubscription = interval(this.interval).pipe(startWith(0)).subscribe(() => {
      this.refresh();
    })
  }

  protected stopRefreshing() {
    this.timerSubscription.unsubscribe();
  }

  protected refresh() { }
}
