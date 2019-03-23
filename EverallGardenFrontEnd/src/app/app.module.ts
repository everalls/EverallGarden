import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { MidgroundComponent } from './midground/midground.component';
import { ForegroundComponent } from './foreground/foreground.component';
import { ValvesComponent } from './valves/valves.component';
import { SensorsComponent } from './sensors/sensors.component';
import { InfoComponent } from './info/info.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ValveComponent } from './valve/valve.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    MidgroundComponent,
    ForegroundComponent,
    ValvesComponent,
    SensorsComponent,
    InfoComponent,
    MainScreenComponent,
    ValveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
