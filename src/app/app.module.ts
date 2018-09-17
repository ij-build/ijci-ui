import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { BuildsComponent } from './builds/builds.component';
import { BuildComponent } from './build/build.component';
import { NewBuildComponent } from './new-build/new-build.component';
import { MessagesComponent } from './messages/messages.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AccordionDirective } from './accordion.directive';
import { DropdownDirective } from './dropdown.directive';

const appRoutes: Routes = [
  { path: '404', component: NotfoundComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: NewProjectComponent },
  { path: 'projects/:project_id', component: ProjectComponent },
  { path: 'builds', component: BuildsComponent },
  { path: 'builds/new', component: NewBuildComponent },
  { path: 'builds/:build_id', component: BuildComponent },
  { path: '', redirectTo: '/builds', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    BuildsComponent,
    BuildComponent,
    MessagesComponent,
    NotfoundComponent,
    AccordionDirective,
    NewBuildComponent,
    NewProjectComponent,
    DropdownDirective
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
