import { Component, OnInit } from '@angular/core';

import { Queue } from '../queue';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  queue: Queue;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.apiService.getQueue().toPromise().then(queue => {
      this.queue = queue;
    });
  }
}
