import { Component, OnInit } from '@angular/core';

import { Project } from '../../../shared/models/project';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  filteredProjects: Project[];
  filterQuery = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.apiService.getProjects().toPromise().then(projects => {
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
