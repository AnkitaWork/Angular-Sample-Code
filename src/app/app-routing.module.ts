import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridComponent } from '../app/ag-grid/ag-grid.component';
import { ReactiveFormComponent } from '../app/reactive-form/reactive-form.component';
import { AngularMaterialComponent } from '../app/angular-material/angular-material.component';
import { ReviewSectionComponent } from '../app/review-section/review-section.component';
import { ReactiveDynamicFormComponent } from '../app/reactive-dynamic-form/reactive-dynamic-form.component';
import { ReactiveFormExampleComponent } from '../app/reactive-form-example/reactive-form-example.component';
const routes: Routes = [
  {
    path: 'ag-grid',
    component: AgGridComponent,
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
  },
  {
    path: 'angular-material',
    component: AngularMaterialComponent,
  },
  {
    path: 'review-section',
    component: ReviewSectionComponent,
  },
  {
    path: 'review-dynamic-form',
    component: ReactiveDynamicFormComponent,
  },
  {
    path: 'review-form-example',
    component: ReactiveFormExampleComponent,
  },
  { path: '', redirectTo: '/ag-grid', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
