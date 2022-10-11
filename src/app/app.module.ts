import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

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
import { AlertComponent } from './components/alert/alert.component';
import { RuleLineBadRedirectionComponent } from './components/rule-line-bad-redirection/rule-line-bad-redirection.component';
import { SidebarButtonComponent } from './components/commons/sidebar-button/sidebar-button.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { MiniButtonComponent } from './components/commons/mini-button/mini-button.component';
import { SliderComponent } from './components/commons/slider/slider.component';
import { TranslateComponent } from './components/commons/translate/translate.component';
import { LoaderComponent } from './components/commons/loader/loader.component';
import { ButtonPopoveredComponent } from './components/commons/button-popovered/button-popovered.component';
import { MarkdownComponent } from './components/commons/markdown/markdown.component';
import { TipsComponent } from './components/tips/tips.component';


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
    ScopeAccordionComponent,
    AlertComponent,
    RuleLineBadRedirectionComponent,
    SidebarButtonComponent,
    FooterComponent,
    MiniButtonComponent,
    SliderComponent,
    TranslateComponent,
    LoaderComponent,
    ButtonPopoveredComponent,
    MarkdownComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgxSmoothDnDModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
