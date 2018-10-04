import { Component } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Build } from '../../shared/models/build';
import { ApiService } from '../../shared/services/api.service';
import { RefreshComponent } from '../../shared/components/refresh/refresh.component';
import { PagedResults } from '../../shared/models/paged-results';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent extends RefreshComponent {
  activeResults: PagedResults<Build>;
  queuedResults: PagedResults<Build>;
  activeFilterQuery = '';
  queuedFilterQuery = '';
  subscription: Subscription;
  keyUp = new Subject<string>();

  ngOnInit() {
    this.subscription = this.keyUp.pipe(debounceTime(250)).subscribe(_ => {
      this.refresh();
    });

    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  refresh(): void {
    const activePage = this.activeResults ? this.activeResults.page : 1;
    const queuedPage = this.queuedResults ? this.queuedResults.page : 1;

    Promise.all([
      this.apiService.getActiveBuilds(activePage, this.activeFilterQuery),
      this.apiService.getQueuedBuilds(queuedPage, this.queuedFilterQuery)
    ]).then(([activeResults, queuedResults]) => {
      this.activeResults = activeResults;
      this.queuedResults = queuedResults;
    });
  }

  loadActivePage(page: number) {
    this.activeResults.getPage(page).then(activeResults => {
      this.activeResults = activeResults;
    });
  }

  loadQueuedPage(page: number) {
    this.queuedResults.getPage(page).then(queuedResults => {
      this.queuedResults = queuedResults;
    });
  }

  seq(n: number): number[] {
    return Array.from(Array(n).keys()).map(n => n + 1);
  }
}
