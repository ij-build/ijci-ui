import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Build } from '../../../shared/models/build';
import { PagedResults } from '../../../shared/models/paged-results';
import { updateParams } from '../../utils/pagination';


@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.css']
})
export class BuildListComponent implements OnInit, OnDestroy {
  @Input() loader: (number, string) => Promise<PagedResults<Build>>;
  @Input() prefix = '';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams[`${this.prefix}-page`] || 1;
    this.filterQuery = this.route.snapshot.queryParams[`${this.prefix}-filterQuery`] || '';

    this.subscription = this.keyUp.pipe(debounceTime(250)).subscribe(_ => {
      this.load(1);
    });

    this.load(this.page);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(page: number): void {
    this.loader(page, this.filterQuery).then(results => {
      this.updateResults(results, page);
    });
  }

  reload(): void {
    this.load(this.page);
  }

  updateResults(results: PagedResults<Build>, page: number) {
    if (page > results.numPages && results.numPages > 0) {
      this.load(results.numPages);
      return;
    }

    this.page = page;
    this.results = results;

    updateParams(this.route, this.router, this.prefix, page, this.filterQuery);
  }
}
