import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Project } from './project';
import { Build, BuildLog } from './build';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProjects(): Observable<Project[]> {
    const observable = this.http.get<object[]>('/api/projects').pipe(
      map(body => parseProjects(body['projects']))
    );

    return this.wrap('getProjects', observable, []);
  }

  getProject(projectId: string): Observable<Project> {
    const observable = this.http.get<object[]>(`/api/projects/${projectId}`).pipe(
      map(body => parseProject(body['project']))
    );

    return this.wrap('getProject', observable, null);
  }

  getBuilds(): Observable<Build[]> {
    const observable = this.http.get<object[]>('/api/builds').pipe(
      map(body => parseBuilds(body['builds']))
    );

    return this.wrap('getBuilds', observable, []);
  }

  getQueue(): Observable<Build[]> {
    const observable = this.http.get<object[]>('/api/queue').pipe(
      map(body => parseBuilds(body['builds']))
    );

    return this.wrap('getQueue', observable, []);
  }

  getBuild(buildId: string): Observable<Build> {
    const observable = this.http.get(`/api/builds/${buildId}`).pipe(
      map(body => parseBuild(body['build']))
    );

    return this.wrap('getBuild', observable, null);
  }

  deleteBuild(buildId: string): Observable<void> {
    const observable = this.http.delete(`/api/builds/${buildId}`).pipe(
      map(_ => null)
    );

    return this.wrap('deleteBuild', observable, null);
  }

  getBuildLog(buildId: string, buildLogId: string): Observable<string> {
    const request = new HttpRequest('GET', `/api/builds/${buildId}/logs/${buildLogId}`, {
      responseType: 'text',
      reportProgress: true
    });

    const observable = this.http.request(request).pipe(map((event: HttpEvent<string>) => {
      switch (event.type) {
        case HttpEventType.DownloadProgress:
          if (event.loaded > 0) {
            return event['partialText'];
          }

        case HttpEventType.Response:
          return event['body'];
      }
    }));

    return this.wrap('getBuildLog', observable, '');
  }

  createProject(name: string, repositoryUrl: string): Observable<string> {
    const payload = {
      'name': name,
      'repository_url': repositoryUrl,
    };

    const observable = this.http.post('/api/projects', payload).pipe(
      map(body => body['project']['project_id'])
    );

    return this.wrap('createProject', observable, null);
  }

  updateProject(project: Project): Observable<Project> {
    const payload = {
      'name': project.name,
      'repository_url': project.repositoryUrl,
    };

    const observable = this.http.patch(`/api/projects/${project.projectId}`, payload).pipe(
      map(body => parseProject(body['project']))
    );

    return this.wrap('updateProject', observable, null);
  }

  deleteProject(projectId: string): Observable<void> {
    const observable = this.http.delete(`/api/projects/${projectId}`).pipe(
      map(_ => null)
    );

    return this.wrap('deleteProject', observable, null);
  }

  queueBuild(projectId: string, repositoryUrl: string, commitBranch: string, commitHash: string): Observable<string> {
    const payload = {
      'project_id': projectId,
      'repository_url': repositoryUrl,
      'commit_branch': commitBranch,
      'commit_hash': commitHash,
    };

    for (let key of Object.keys(payload)) {
      if (!payload[key]) {
        delete payload[key];
      }
    }

    const observable = this.http.post('/api/builds', payload).pipe(
      map(body => body['build']['build_id'])
    );

    return this.wrap('queueBuild', observable, null);
  }

  requeueBuild(buildId: string): Observable<void> {
    const observable = this.http.post(`/api/builds/${buildId}/requeue`, {}).pipe(
      map(_ => null)
    );

    return this.wrap('requeueBuild', observable, null);
  }

  //
  //

  wrap<T>(method: string, observable: Observable<T>, result?: T): Observable<T> {
    const ident = uuid().substring(0, 6);
    this.log(method, ident, 'started');

    return observable.pipe(
      catchError(error => {
        this.log(method, ident, `failed (${error.message})`);
        return of(result as T);
      }),
      tap(() => {
        this.log(method, ident, 'updated');
      })
    );
  }

  private log(method: string, identifier: string, message: string) {
    this.messageService.add(`[${identifier}] ApiService.${method}: ${message}`);
  }
}

function parseProjects(data: object[]): Project[] {
  return data.map(parseProject);
}

function parseProject(data: object): Project {
  return new Project(
    data['project_id'],
    data['name'],
    data['repository_url'],
    data['last_build_id'],
    data['last_build_status'],
    data['last_build_completed_at'],
    (data['builds'] || []).map(parseBuild)
  );
}

function parseBuilds(data: object[]): Build[] {
  return data.map(parseBuild);
}

function parseBuild(data: object): Build {
  return new Build(
    parseProject(data['project'] || {}),
    data['build_id'],
    data['build_status'],
    data['agent_addr'],
    data['commit_branch'],
    data['commit_hash'],
    data['commit_message'],
    data['commit_author_name'],
    data['commit_author_email'],
    data['commit_authored_at'],
    data['commit_committer_name'],
    data['commit_committer_email'],
    data['commit_committed_at'],
    data['error_message'],
    data['created_at'],
    data['started_at'],
    data['completed_at'],
    (data['build_logs'] || []).map(parseBuildLog)
  );
}

function parseBuildLog(data: object): BuildLog {
  return new BuildLog(
    data['build_log_id'],
    data['name'],
    data['created_at'],
    data['uploaded_at'],
    ''
  );
}
