import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project';
import { BuildService } from '../build.service';

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
    private buildService: BuildService
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(): void {
    this.subscription = this.buildService.getProjects().subscribe(projects => {
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
