import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/core/app-layout/app-layout.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterJobSeekerComponent } from './components/register-job-seeker/register-job-seeker.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'register-job-seeker',
        component: RegisterJobSeekerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }