import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../project';
import { ApiService } from '../api.service';
import { ModalDirective } from '../modal.directive';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(ModalDirective) modal;
  project: Project;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    const projectId = this.route.snapshot.paramMap.get('project_id');

    this.apiService.getProject(projectId).toPromise().then(project => {
      this.project = project;
    });
  }

  queue(): void {
    this.apiService.queueBuild(
      this.project.projectId,
      this.project.repositoryUrl,
      '',
      ''
    ).toPromise().then(buildId => {
      this.router.navigate([`/builds/${buildId}`]);
    });
  }

  delete(): void {
    this.modal.show(() => this.apiService.deleteProject(this.project.projectId).toPromise().then(() => {
      this.router.navigate(['/projects']);
    }));
  }
}
