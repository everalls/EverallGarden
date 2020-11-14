import { InstructionService } from './instruction.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { ForegroundComponent } from './foreground/foreground.component';
import { InfoComponent } from './info/info.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MidgroundComponent } from './midground/midground.component';
import { OverlayComponent } from './overlay/overlay.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ValveControlComponent } from './valve-control/valve-control.component';
import { ValvesComponent } from './valves/valves.component';
import { ValveComponent } from './valve/valve.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ValveService } from './valve.service';

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
    ValveComponent,
    OverlayComponent,
    ValveControlComponent
  ],

  imports: [
    BrowserModule,
	AppRoutingModule,
	AngularFireModule.initializeApp(environment.  firebase),
	AngularFirestoreModule, // Only required for database features
	AngularFireStorageModule // Only required for storage features
  ],

  providers: [
	InstructionService,
	ValveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
