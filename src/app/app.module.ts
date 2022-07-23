import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddScopeComponent } from './add-scope/add-scope.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { OverviewComponent } from './overview/overview.component';
import { ScopeConfigComponent } from './components/scope-config/scope-config.component';
import { RuleLineComponent } from './components/rule-line/rule-line.component';
import { CsvRulesImportComponent } from './csv-rules-import/csv-rules-import.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddScopeComponent,
    ExportFileComponent,
    OverviewComponent,
    ScopeConfigComponent,
    RuleLineComponent,
    CsvRulesImportComponent,
    RulesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
