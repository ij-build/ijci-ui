import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class NewProjectComponent {
  name = '';
  repositoryUrl = '';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  create(): void {
    this.apiService.createProject(this.name, this.repositoryUrl).toPromise().then(projectId => {
      this.router.navigate([`/projects/${projectId}`]);
    });
  }
}
