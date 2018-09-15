import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../project';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private buildSerivce: BuildService,
    private location: Location
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    const projectId = this.route.snapshot.paramMap.get('project_id');

    this.buildSerivce.getProject(projectId).toPromise().then(project => {
      this.project = project;
    });
  }
}
