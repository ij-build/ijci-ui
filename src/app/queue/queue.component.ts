import { Component, OnInit } from '@angular/core';

import { Build } from '../build';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  builds: Build[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.apiService.getQueue().toPromise().then(builds => {
      this.builds = builds;
    });
  }
}
