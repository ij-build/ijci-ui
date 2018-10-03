import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

import { Project } from '../../../shared/models/project';
import { ApiService } from '../../../shared/services/api.service';
import { PagedResults } from '../../../shared/models/paged-results';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  results: PagedResults<Project>;
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
    this.apiService.getProjects(1, this.filterQuery).then(results => {
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
