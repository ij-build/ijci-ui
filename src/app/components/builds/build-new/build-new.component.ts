import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../../shared/models/project';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-build-new',
  templateUrl: './build-new.component.html',
  styleUrls: ['./build-new.component.css']
})
export class NewBuildComponent implements OnInit {
  projects: Project[];
  loaded = false;

  projectId = '';
  repositoryUrl = '';
  commitHash = '';
  commitBranch = '';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit () {
    this.apiService.getProjects().toPromise().then(projects => {
      this.loaded = true;
      this.projects = projects;
    });
  }

  onProjectSelected(val: string): void {
    this.projectId = val;
  }

  queueBuild(): void {
    this.apiService.queueBuild(
      this.projectId,
      this.repositoryUrl,
      this.commitBranch,
      this.commitHash
    ).toPromise().then(buildId => {
      this.router.navigate([`/builds/${buildId}`]);
    });
  }
}
