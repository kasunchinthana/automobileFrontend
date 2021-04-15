import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})

export class VehicleListComponent implements OnInit {

    vehicles?: Vehicle[];
    currentVehicle?: Vehicle;
    currentIndex = -1;
    carModel = '';
    resp: any = {};
    displayedColumns: string[] = ['firstName', 'lastName','email','carMake','carModel','manufacturedDate','deleteAction'];
  // dataSource : Vehicle[];
    // datasource 
    dataSource = new MatTableDataSource<Vehicle>([]);
    //dataSource = new MatTableDataSource<Vehicle>[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any;
    
    constructor(private apollo: Apollo,private vehicleService:VehicleService,private _snackBar: MatSnackBar) { }

      ngOnInit(): void {
      this.apollo.query({
        query: gql `{
          allVehicles (carModel:""){ 
            id           
                  firstName
                  lastName
                  email
                  carMake
                  carModel
                  vinNumber
                  manufacturedDate
                  ageOfVehicle
                        
          }
		    }`
       }).subscribe( 
        res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.allVehicles;
        this.vehicles = this.resp.data.allVehicles
        console.log(this.data);
        console.log(this.dataSource.data);
      //  this.isLoadingResults = false;
      });
    }
    searchCarModel(): void{
      
      //this.carModel =
      this.apollo.query({
        query: gql `
          query($carModel:String!){ 
            allVehicles(carModel:$carModel){
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
        carModel: this.carModel
      }
          
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.allVehicles;
        if(this.resp.data.allVehicles.length===undefined){
          this.dataSource.data  = [{
            // //carMake: this.resp.data.allVehicles[0].carMake,
            // carModel: this.resp.data.allVehicles.carModel,
            // email: this.resp.data.allVehicles.email,
            // firstName: this.resp.data.allVehicles.firstName,
            // id: this.resp.data.allVehicles.id,
            // last_name: this.resp.data.allVehicles.last_name,
            // manufacturedDate: this.resp.data.allVehicles.manufacturedDate,
            // vinNumber: this.resp.data.allVehicles.vinNumber,
          }];
          this.vehicles = this.resp.data.allVehicles;
          }else{
            this.vehicles = this.resp.data.allVehicles;
            this.dataSource.data=this.resp.data.allVehicles;
          }
      
      //  this.isLoadingResults = false;
      });
    }
    
    update(index):void{
      let updatedVehicle = this.vehicles[index];
      this.apollo.mutate({
        mutation: gql`
        mutation  {
          updateVehicleById(id: "1"
        firstName: "tildaaa") {
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
        variables: {id:"1",
          firstName: "this.vehicles"
        }
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.updateVehicleById;
        this.vehicles = this.resp.data.updateVehicleById;
        console.log(this.data);
        console.log(this.dataSource.data);
      //  this.isLoadingResults = false;
      });
        
          
    }
    onRowClicked(index): void {
    this.currentIndex = index;
    }
}
  //}
  // ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginator;
   
  // }
  
    

  // refreshList(): void {
  //   this.retrieveVehicle();
  //   this.currentVehicle = undefined;
  //   this.currentIndex = -1;
  // }

  // onRowClicked(index): void {
  //   this.currentIndex = index;
  // }
  // searchCarModel(): void {
  //   this.vehicleService.findByCarModel(this.car_model).subscribe((res:any ) => {
    
  //       //this.dataSource = new MatTableDataSource(data);
  //       if(res.length===undefined){
  //       this.dataSource.data  = [{
  //         age_of_vehicle: res.age_of_vehicle,
  //         car_make: res.car_make,
  //         car_model: res.car_model,
  //         email: res.email,
  //         first_name: res.first_name,
  //         id: res.id,
  //         last_name: res.last_name,
  //         manufactured_date: res.manufactured_date,
  //         vin_number: res.vin_number,
  //       }];
  //       this.vehicles = res;
  //       }else{
  //         this.vehicles = res;
  //         this.dataSource.data=res;
  //       }
     
        
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }
  

  // delete(index): void {
  //   let updatedVehicle = this.vehicles[index];
  //   this.vehicleService.delete(this.currentVehicle.id)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this._snackBar.open('succesfully deleted', '', {
  //           duration: 2000,
  //         });
  //         this.currentIndex=-1;
  //        // this.router.navigate(['api/vehicle']);
  //       },
  //       error => {
  //         console.log(error);
  //         this._snackBar.open('error', '', {
  //           duration: 2000,
  //         });
  //         this.currentIndex=-1;
  //       });
  //     }
