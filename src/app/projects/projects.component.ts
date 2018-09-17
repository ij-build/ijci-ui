import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  filteredProjects: Project[];
  filterQuery = '';
  subscription: Subscription;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(): void {
    this.subscription = this.apiService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filter();
    });
  }

  filter(): void {
    this.filteredProjects = this.projects.filter(b => this.matchesAny([
      b.name,
      b.repositoryUrl,
    ]));
  }

  matchesAny(strings: string[]): boolean {
    for (const part of this.filterQuery.split(' ')) {
      if (!strings.filter(s => s).some(s => s.includes(part))) {
        return false;
      }
    }

    return true;
  }
}
