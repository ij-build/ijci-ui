import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { Build } from '../../../shared/models/build';
import { ApiService } from '../../../shared/services/api.service';
import { PagedResults } from '../../../shared/models/paged-results';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit, OnDestroy {
  results: PagedResults<Build>;
  filterQuery = '';
  subscription: Subscription;
  keyUp = new Subject<string>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.subscription = this.keyUp.pipe(debounceTime(250)).subscribe(_ => {
      this.load();
    });

    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(): void {
    this.apiService.getBuilds(1, this.filterQuery).then(results => {
      this.results = results;
    });
  }

  loadPage(page: number) {
    this.results.getPage(page).then(results => {
      this.results = results;
    });
  }

  seq(n: number): number[] {
    return Array.from(Array(n).keys()).map(n => n + 1);
  }
}
