import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
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
