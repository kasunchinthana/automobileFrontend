import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import {DownloadCsvComponent} from './components/download-csv/download-csv.component';

const routes: Routes = [
  { path: '', redirectTo: 'api/vehicle', pathMatch: 'full' },
  { path: 'api/vehicle', component: VehicleListComponent },
  { path: 'api/vehiclegraph', component: VehicleDetailsComponent },
  { path: 'api/upload', component: UploadFilesComponent },
  { path: 'api/download', component: DownloadCsvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
