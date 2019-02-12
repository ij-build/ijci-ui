import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Project } from '../../../shared/models/project';
import { ApiService } from '../../../shared/services/api.service';
import { PagedResults } from '../../../shared/models/paged-results';
import { updateParams } from '../../../shared/utils/pagination';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  results: PagedResults<Project>;
  page = 1;
  filterQuery = '';
  subscription: Subscription;
  keyUp = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams['page'] || 1;
    this.filterQuery = this.route.snapshot.queryParams['filterQuery'] || '';

    this.subscription = this.keyUp.pipe(debounceTime(250)).subscribe(_ => {
      this.load(1);
    });

    this.load(this.page);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(page: number): void {
    this.apiService.getProjects(page, this.filterQuery).then(results => {
      this.updateResults(results, page);
    });
  }

  updateResults(results: PagedResults<Project>, page: number) {
    if (page > results.numPages && results.numPages > 0) {
      this.load(results.numPages);
      return;
    }

    this.page = page;
    this.results = results;

    updateParams(this.route, this.router, '', page, this.filterQuery);
  }
}
