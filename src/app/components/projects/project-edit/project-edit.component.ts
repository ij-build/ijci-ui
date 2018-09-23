import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../../shared/models/project';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class EditProjectComponent implements OnInit {
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

  update(): void {
    this.apiService.updateProject(this.project).toPromise().then(project => {
      this.router.navigate([`/projects/${project.projectId}`]);
    });
  }
}
