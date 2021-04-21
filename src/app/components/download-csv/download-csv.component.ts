import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCsvComponent implements OnInit {

  constructor(private toastr: ToastrService,private apollo: Apollo,private vehicleService:VehicleService) { }
  ageOfVehicle = '';
  resp: any = {};
  ngOnInit(): void {
  }
    downloadCsv():void{
      this.apollo.query({
        query: gql `
          query($ageOfVehicle:String!){ 
            allVehicles(ageOfVehicle:$ageOfVehicle){
              id
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate 
            }
            }
        `,
      variables: {
        ageOfVehicle: this.ageOfVehicle
      }
          
      }).subscribe(res => {
        this.resp = res;
        
        this.toastr.success('Hello world!', 'runnin!'); 
      //  this.isLoadingResults = false;
      });
  };
}