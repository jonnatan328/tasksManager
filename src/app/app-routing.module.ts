import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './helpers/auth.guard';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ListProjectComponent } from './components/list-project/list-project.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'projects', component: ListProjectComponent, canActivate: [AuthGuard]},
  { path: 'editTask', component: EditTaskComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
