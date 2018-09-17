import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Build } from '../build';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit, OnDestroy {
  builds: Build[];
  filteredBuilds: Build[];
  filterQuery = '';
  subscription: Subscription;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(): void {
    this.subscription = this.apiService.getBuilds().subscribe(builds => {
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
