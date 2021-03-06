import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
/* import { HttpClientModule } from  '@angular/common/http'; */
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddScopeComponent } from './pages/add-scope/add-scope.component';
import { ExportFileComponent } from './pages/export-file/export-file.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ScopeConfigComponent } from './components/scope-config/scope-config.component';
import { RuleLineComponent } from './components/rule-line/rule-line.component';
import { CsvRulesImportComponent } from './pages/csv-rules-import/csv-rules-import.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { CodePreviewComponent } from './components/code-preview/code-preview.component';
import { DeleteScopeComponent } from './pages/delete-scope/delete-scope.component';
import { ScopeComponent } from './components/scope/scope.component';
import { ScopeAccordionComponent } from './components/scope-accordion/scope-accordion.component';



@NgModule({
  declarations: [
    AppComponent,
    AddScopeComponent,
    ExportFileComponent,
    OverviewComponent,
    ScopeConfigComponent,
    RuleLineComponent,
    CsvRulesImportComponent,
    RulesListComponent,
    CodePreviewComponent,
    DeleteScopeComponent,
    ScopeComponent,
    ScopeAccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    /* HttpClientModule, */
    NgxSmoothDnDModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
