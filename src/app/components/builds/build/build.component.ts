import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Build } from '../../../shared/models/build';
import { ApiService } from '../../../shared/services/api.service';
import { RefreshComponent } from '../../../shared/components/refresh/refresh.component';
import { ModalDirective } from '../../../shared/directives/modal.directive';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent extends RefreshComponent implements OnDestroy {
  @ViewChild(ModalDirective) modal;
  interval = 1000;
  build: Build;
  activeLogs = new Set<string>();
  logSubscriptions = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    super();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    for (const sub of this.logSubscriptions) {
      sub.unsubscribe();
    }
  }

  protected refresh(): void {
    this.apiService.getBuild(this.route.snapshot.paramMap.get('build_id')).toPromise().then(build => {
      this.merge(build);
    });
  }

  merge(build: Build): void {
    if (!this.build) {
      this.build = build;
    } else {
      this.build.merge(build);
    }

    if (build.isTerminal()) {
      this.stopRefreshing();
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

  cancel(): void {
    this.apiService.cancelBuild(this.build.buildId).toPromise().then(() => {
      this.build = null;
      this.load();
    });
  }

  delete(): void {
    this.modal.show(() => this.apiService.deleteBuild(this.build.buildId).toPromise().then(() => {
      this.router.navigate(['/builds']);
    }));
  }

  requeue(): void {
    this.apiService.requeueBuild(this.build.buildId).toPromise().then(() => {
      this.build = null;
      this.load();
    });
  }

  gravatar(email: string): string {
    return `http://gravatar.com/avatar/${Md5.hashStr(email.trim().toLowerCase())}`;
  }
}
