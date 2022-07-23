import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScopeComponent } from './pages/add-scope/add-scope.component';
import { ExportFileComponent } from './pages/export-file/export-file.component';
import { CsvRulesImportComponent } from './pages/csv-rules-import/csv-rules-import.component';
import { OverviewComponent } from './pages/overview/overview.component';

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
    path:'csv-rules-import',
    component: CsvRulesImportComponent
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
