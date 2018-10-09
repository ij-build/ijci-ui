import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Build } from '../../../shared/models/build';
import { PagedResults } from '../../../shared/models/paged-results';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.css']
})
export class BuildListComponent implements OnInit, OnDestroy {
  @Input() loader: (string) => Promise<PagedResults<Build>>;
  results: PagedResults<Build>;
  page = 1;
  filterQuery = '';
  subscription: Subscription;
  keyUp = new Subject<string>();

  calendarOptions = {
    sameDay: 'hh:mm a',
    lastDay: '[Yesterday] hh:mm a',
    lastWeek: 'ddd hh:mm a',
  };

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
    this.loader(this.filterQuery).then(results => {
      this.page = 1;
      this.results = results;
    });
  }

  loadPage(page: number) {
    const self = this;

    this.results.getPage(page).then(results => {
      if (page > results.numPages && results.numPages > 0) {
        self.loadPage(results.numPages);
        return;
      }

      this.page = page;
      this.results = results;
    });
  }

  reload() {
    if (this.results) {
      this.loadPage(this.page);
    } else {
      this.load();
    }
  }
}
