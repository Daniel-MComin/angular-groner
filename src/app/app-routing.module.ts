import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataDrivenFormComponent } from './data-driven-form/data-driven-form.component';

const routes: Routes = [
  {path: 'templateForm', component: TemplateFormComponent },
  {path: 'dataDrivenForm', component: DataDrivenFormComponent },
  {path: '', pathMatch: 'full', redirectTo: 'dataDrivenForm'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
