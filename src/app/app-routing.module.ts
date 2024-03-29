import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScopeComponent } from './pages/add-scope/add-scope.component';
import { ExportFileComponent } from './pages/export-file/export-file.component';
import { CsvRulesImportComponent } from './pages/csv-rules-import/csv-rules-import.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DeleteScopeComponent } from './pages/delete-scope/delete-scope.component';
import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { BatchProcessingComponent } from './pages/batch-processing/batch-processing.component';
import { LockedRulesComponent } from './pages/locked-rules/locked-rules.component';

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
    path:'delete-scope',
    component: DeleteScopeComponent
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
    path:'csv-batch-processing',
    component: BatchProcessingComponent
  },
  {
    path:'locked-rules',
    component: LockedRulesComponent
  },
  {
    path: '',
    component: SplashScreenComponent
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
