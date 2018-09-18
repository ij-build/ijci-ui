import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Build } from '../build';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit, OnDestroy {
  build: Build;
  activeLogs = new Set<string>();
  timerSubscription: Subscription;
  logSubscriptions = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();

    for (const sub of this.logSubscriptions) {
      sub.unsubscribe();
    }
  }

  load(): void {
    const buildId = this.route.snapshot.paramMap.get('build_id');

    // TODO - find a better strategy for this
    this.timerSubscription = interval(5000).pipe(startWith(0)).subscribe(() => {
      this.apiService.getBuild(buildId).toPromise().then(build => {
        this.refresh(build);
      });
    });
  }

  refresh(build: Build): void {
    if (!this.build) {
      this.build = build;
    } else {
      this.build.merge(build);
    }

    if (build.isTerminal()) {
      this.timerSubscription.unsubscribe();
    }

    for (const buildLog of build.buildLogs) {
      if (this.activeLogs.has(buildLog.buildLogId)) {
        continue;
      }

      this.logSubscriptions.push(this.apiService.getBuildLog(build.buildId, buildLog.buildLogId).subscribe(content => {
        buildLog.content = content;
      }));

      this.activeLogs.add(buildLog.buildLogId);
    }
  }

  delete(): void {
    this.apiService.deleteBuild(this.build.buildId).toPromise().then(() => {
      this.router.navigate(['/builds']);
    });
  }

  back(): void {
    this.location.back();
  }
}
