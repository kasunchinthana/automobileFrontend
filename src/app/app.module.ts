import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'  
import { MatPaginatorModule } from '@angular/material/paginator';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GraphQLModule } from './graphql.module';
import { DownloadCsvComponent } from './components/download-csv/download-csv.component';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleDetailsComponent,
    VehicleListComponent,
    UploadFilesComponent,
    DownloadCsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    CdkTableModule,
    MatIconModule,
    MatSnackBarModule,
    GraphQLModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
