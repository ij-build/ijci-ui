import { Component } from '@angular/core';

import { Queue } from '../../shared/models/queue';
import { ApiService } from '../../shared/services/api.service';
import { RefreshComponent } from '../../shared/components/refresh/refresh.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent extends RefreshComponent {
  queue: Queue;

  constructor(
    private apiService: ApiService
  ) {
    super();
  }

  refresh(): void {
    this.apiService.getQueue().toPromise().then(queue => {
      this.queue = queue;
    });
  }
}
