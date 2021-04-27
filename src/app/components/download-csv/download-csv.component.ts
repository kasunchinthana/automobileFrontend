import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';
import { WebSocketService } from '../../web-socket.service';

import io from 'socket.io-client';
import { Subscription } from 'rxjs';

const socket = io('http://localhost:3000');

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCsvComponent implements OnInit {
  stockQuote: string;
  sub: Subscription;
 // constructor(private dataService: WebSocketService) { }
  constructor(private webSocketService: WebSocketService,private toastr: ToastrService,private apollo: Apollo,private vehicleService:VehicleService) { }
  vehicleAge = '';
  resp: any = {};
  feedback: string;
  ngOnInit(): void {
    //this.webSocketService.listen('alertToClient').subscribe((data) => this.updateFeedback(data));

    this.sub = this.webSocketService.getQuotes()
    .subscribe(quote => {
      this.stockQuote = quote;  
    });
    console.log(this.stockQuote);
    this.updateFeedback(this.stockQuote);
   // this.updateChartData(this.chart, res, 0);
   // this.updateChartData(this.doughnut,res.slice(0,5), 0);

  // this.sub = this.webSocketService.getQuotes()
  // .subscribe(quote => {
  //   this.stockQuote = quote;
  //   console.log('This is angular '+this.stockQuote);
  // });

  }

  

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
    downloadCsv():void{
      this.apollo.query({
        query: gql `
          query($vehicleAge:String!) {
            getVehicleByAge(vehicleAge:$vehicleAge){
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate
                ageOfVehicle
                }

            }
        `,
      variables: {
        vehicleAge: this.vehicleAge
      }
          
      }).subscribe(res => {
        this.resp = res;
        
        this.toastr.success('Hello world!',this.feedback ); 
      });
  };

  updateFeedback(data: any){
    console.log("upaseteee");
    this.feedback = "${data} is typing a message";
   // this.toastr.success('Hello world!',this.feedback ); 
      
  }
}