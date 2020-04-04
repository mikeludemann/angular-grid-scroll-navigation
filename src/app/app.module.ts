import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridScrollNavigationComponent } from './components/grid-scroll-navigation/grid-scroll-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    GridScrollNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
