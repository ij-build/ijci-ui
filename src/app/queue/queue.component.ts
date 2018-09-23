import { Component } from '@angular/core';

import { Queue } from '../queue';
import { ApiService } from '../api.service';
import { RefreshComponent } from '../refresh.component';

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
