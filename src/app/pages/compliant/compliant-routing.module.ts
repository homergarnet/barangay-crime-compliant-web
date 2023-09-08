import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompliantGuardsGuard } from '../auth/guards/compliant-guards.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [CompliantGuardsGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompliantRoutingModule { }
