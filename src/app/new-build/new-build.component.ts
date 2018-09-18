import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../project';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-build',
  templateUrl: './new-build.component.html',
  styleUrls: ['./new-build.component.css']
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
