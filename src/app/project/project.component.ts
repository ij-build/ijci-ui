import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../project';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
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

  delete(): void {
    this.apiService.deleteProject(this.project.projectId).toPromise().then(() => {
      this.router.navigate(['/projects']);
    });
  }
}
