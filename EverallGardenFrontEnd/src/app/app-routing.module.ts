import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MidgroundComponent } from './midground/midground.component';
import { ValvesComponent } from './valves/valves.component';
import { SensorsComponent } from './sensors/sensors.component';
import { InfoComponent } from './info/info.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

const routes: Routes = [
  {path: '', component: MainScreenComponent},
  {path: 'valves', component: ValvesComponent},
  {path: 'sensors', component: SensorsComponent},
  {path: 'info', component: InfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
