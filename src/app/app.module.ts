import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { QueueComponent } from './components/queue/queue.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { NewProjectComponent } from './components/projects/project-new/project-new.component';
import { EditProjectComponent } from './components/projects/project-edit/project-edit.component';
import { BuildsComponent } from './components/builds/builds/builds.component';
import { BuildComponent } from './components/builds/build/build.component';
import { NewBuildComponent } from './components/builds/build-new/build-new.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccordionDirective } from './shared/directives/accordion.directive';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { PopupDirective } from './shared/directives/popup.directive';
import { ModalDirective } from './shared/directives/modal.directive';

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
    AccordionDirective,
    DropdownDirective,
    MessagesComponent,
    NotfoundComponent,
    AppComponent,
    QueueComponent,
    ProjectsComponent,
    ProjectComponent,
    NewProjectComponent,
    EditProjectComponent,
    BuildsComponent,
    BuildComponent,
    NewBuildComponent,
    PopupDirective,
    ModalDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
