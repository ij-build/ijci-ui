import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Build } from '../build';
import { BuildService } from '../build.service';

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
    private router: Router,
    private buildService: BuildService
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  load(): void {
    this.subscription = this.buildService.getBuilds().subscribe(builds => {
      this.builds = builds;
      this.filter();
    });
  }

  filter(): void {
    this.filteredBuilds = this.builds.filter(b => this.matchesAny([
      b.project.name,
      b.project.repositoryUrl,
      b.commitAuthorName,
      b.commitAuthorEmail,
      b.commitMessage,
      b.commitHash
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

  queueBuild(repositoryUrl: string): void {
    this.buildService.queueBuild(repositoryUrl).toPromise().then(buildId => {
      this.router.navigate([`/builds/${buildId}`]);
    });
  }
}
