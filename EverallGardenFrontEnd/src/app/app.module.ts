import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { MidgroundComponent } from './midground/midground.component';
import { ForegroundComponent } from './foreground/foreground.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    MidgroundComponent,
    ForegroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
