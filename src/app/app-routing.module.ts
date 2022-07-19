import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScopeComponent } from './add-scope/add-scope.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path:'overview',
    component: OverviewComponent
  },
  {
    path:'add-new-scope',
    component: AddScopeComponent
  },
  {
    path:'export-file',
    component: ExportFileComponent
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
