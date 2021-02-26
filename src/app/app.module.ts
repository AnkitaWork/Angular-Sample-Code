import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injector,CUSTOM_ELEMENTS_SCHEMA, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewSectionComponent } from './review-section/review-section.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AngularMaterialComponent } from './angular-material/angular-material.component';
import { DemoMaterialModule } from './material-module';
import { ReactiveDynamicFormComponent } from './reactive-dynamic-form/reactive-dynamic-form.component'; 
import { InterceptedHttp } from './shared/http.interceptor';
import { ReactiveFormExampleComponent } from './reactive-form-example/reactive-form-example.component';
@NgModule({
  declarations: [
    AppComponent,
    ReviewSectionComponent,
    ReactiveFormComponent,
    AgGridComponent,
    AngularMaterialComponent,
    ReactiveDynamicFormComponent,
    ReactiveFormExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoMaterialModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.forRoot()
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: InterceptedHttp,
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap { 
  constructor(private injector:Injector){}
  ngDoBootstrap(){
    const customReviewComponent = createCustomElement(ReviewSectionComponent,{injector:this.injector});
    customElements.define('sales-site-custom-elements',customReviewComponent); 
  }
}
