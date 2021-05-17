import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { VehicleService } from '../../services/vehicle.service';
import  * as sc from 'socketcluster-client';
@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCsvComponent implements OnInit , AfterContentInit{
  listener: string;
  sub: Subscription;
  socket:any;
  constructor(httpLink: HttpLink, private toastr: ToastrService, private apollo: Apollo, private vehicleService: VehicleService) {

  }
  
  vehicleAge = '';
  resp: any = {};
  feedback: string;
  ngOnInit(): void {
   this.socket =sc.create({
     hostname:'localhost',
     port:8000
   })

    // this.sub = this.webSocketService.getListen().subscribe(listen => {
    //   this.listener = listen;
    //   this.toastr.success('DownloadFile', this.listener, {
    //     timeOut: 10000,
    //   });
    // });
    //  socket.invoke('myProc', 123);
    //  //socket.on
    //  socketCluster.on('connection', function (socket) {
    //   // ...
    
    //   socket.on('ping', function (data) {
       
    //     console.log('PING', data);
    //     socketCluster.exchange.publish('pong', data);
    //   });
    // });
  }
  ngAfterContentInit(): void {
    console.log("************************aaaaaaaaaaaaaaaaa");
    var abc = "job.data.file";
    this.toastr.success('DownloadFile', this.listener, {
      timeOut: 10000,
    });
    (async () => {
      console.log("************************");
      this.toastr.success('DownloadFile', this.listener, {
        timeOut: 10000,
      });
      let myChannel = this.socket.subscribe(`updateChannel${abc}`);
    //  console.log(myChannel)
      for await(let data of myChannel){
      //  console.log("************************");
      //  console.log(data);
        this.toastr.success('DownloadFile', this.listener, {
               timeOut: 10000,
             });
      }
    })
    // throw new Error('Method not implemented.');
  }
  
  downloadCsv(): void {
    this.vehicleService.findByVehicleAge(this.vehicleAge).subscribe((res: any) => {
     this.resp = res;
    });
  }
}