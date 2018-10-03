import { Component } from '@angular/core';

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

  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  refresh(): void {
    Promise.all([
      // TODO - get with current page if set
      this.apiService.getActiveBuilds(),
      this.apiService.getQueuedBuilds()
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
