import { Component } from '@angular/core';

import { Build } from '../../shared/models/build';
import { ApiService } from '../../shared/services/api.service';
import { RefreshComponent } from '../../shared/components/refresh/refresh.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent extends RefreshComponent {
  activeBuilds: Build[];
  queuedBuilds: Build[];

  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  refresh(): void {
    Promise.all([
      this.apiService.getActiveBuilds().toPromise(),
      this.apiService.getQueuedBuilds().toPromise()
    ]).then(([activeBuilds, queuedBuilds]) => {
      this.activeBuilds = activeBuilds;
      this.queuedBuilds = queuedBuilds;
    });
  }
}
