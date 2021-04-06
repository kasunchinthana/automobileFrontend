import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'api/vehicle', pathMatch: 'full' },
  { path: 'api/vehicle', component: VehicleListComponent },
  { path: 'api/vehicle/:id', component: VehicleDetailsComponent },
  { path: 'api/upload', component: UploadFilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
