import { Component, ViewChildren, QueryList, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Build } from '../../shared/models/build';
import { ApiService } from '../../shared/services/api.service';
import { RefreshComponent } from '../../shared/components/refresh/refresh.component';
import { PagedResults } from '../../shared/models/paged-results';
import { BuildListComponent } from 'src/app/shared/components/build-list/build-list.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent extends RefreshComponent implements AfterViewInit {
  @ViewChildren(BuildListComponent) buildLists: QueryList<BuildListComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.refresh();
  }

  activeLoader(page: number, filterQuery: string): Promise<PagedResults<Build>> {
    return this.apiService.getActiveBuilds(page, filterQuery);
  }

  queuedLoader(page: number, filterQuery: string): Promise<PagedResults<Build>> {
    return this.apiService.getQueuedBuilds(page, filterQuery);
  }

  refresh(): void {
    if (!this.buildLists) {
      return;
    }

    for (const buildList of this.buildLists.toArray()) {
      buildList.reload();
    }
  }
}
