import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../../web-socket.service';
import { Subscription } from 'rxjs';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCsvComponent implements OnInit {
  listener: string;
  sub: Subscription;
  constructor(httpLink: HttpLink, private webSocketService: WebSocketService, private toastr: ToastrService, private apollo: Apollo, private vehicleService: VehicleService) {

  }
  vehicleAge = '';
  resp: any = {};
  feedback: string;
  ngOnInit(): void {
    this.sub = this.webSocketService.getListen().subscribe(listen => {
      this.listener = listen;
      this.toastr.success('DownloadFile', this.listener, {
        timeOut: 10000,
      });
    });
  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  downloadCsv(): void {
    this.vehicleService.findByVehicleAge(this.vehicleAge).subscribe((res: any) => {
      this.sub = this.webSocketService.getListen()
        .subscribe(listen => {
          this.listener = listen;
        })
    });
  }
}