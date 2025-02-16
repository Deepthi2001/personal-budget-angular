import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,  // Declare all components that are part of this module
    MenuComponent
  ],
  imports: [
    BrowserModule, // Browser-specific modules for the application
  ],
  providers: [], // Add services and providers that need to be globally available
  bootstrap: [AppComponent] // Set the root component of the application
})
export class AppModule { }
