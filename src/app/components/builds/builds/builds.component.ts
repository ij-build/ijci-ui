import { Component, OnInit } from '@angular/core';

import { Build } from '../../../shared/models/build';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {
  builds: Build[];
  filteredBuilds: Build[];
  filterQuery = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }


  load(): void {
    this.apiService.getBuilds().toPromise().then(builds => {
      this.builds = builds;
      this.filter();
    });
  }

  filter(): void {
    this.filteredBuilds = this.builds.filter(b => this.matchesAny([
      b.project.name,
      b.project.repositoryUrl,
      b.commitBranch,
      b.commitMessage,
      b.commitHash,
      b.commitCommitterName,
      b.commitCommitterEmail,
      b.commitAuthorName,
      b.commitAuthorEmail
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
