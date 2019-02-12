import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { BuildComponent } from './components/builds/build/build.component';
import { BuildsComponent } from './components/builds/builds/builds.component';
import { EditProjectComponent } from './components/projects/project-edit/project-edit.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { BuildListComponent } from './shared/components/build-list/build-list.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { NewBuildComponent } from './components/builds/build-new/build-new.component';
import { NewProjectComponent } from './components/projects/project-new/project-new.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { QueueComponent } from './components/queue/queue.component';

import { AccordionDirective } from './shared/directives/accordion.directive';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { ModalDirective } from './shared/directives/modal.directive';
import { PopupDirective } from './shared/directives/popup.directive';

const appRoutes: Routes = [
  { path: '404', component: NotfoundComponent },
  { path: 'queue', component: QueueComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: NewProjectComponent },
  { path: 'projects/:project_id', component: ProjectComponent },
  { path: 'projects/:project_id/edit', component: EditProjectComponent },
  { path: 'builds', component: BuildsComponent },
  { path: 'builds/new', component: NewBuildComponent },
  { path: 'builds/:build_id', component: BuildComponent },
  { path: '', redirectTo: '/builds', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    BuildsComponent,
    EditProjectComponent,
    MessagesComponent,
    BuildListComponent,
    PaginationComponent,
    NewBuildComponent,
    NewProjectComponent,
    NotfoundComponent,
    ProjectComponent,
    ProjectsComponent,
    QueueComponent,
    // Directives
    AccordionDirective,
    DropdownDirective,
    ModalDirective,
    PopupDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
