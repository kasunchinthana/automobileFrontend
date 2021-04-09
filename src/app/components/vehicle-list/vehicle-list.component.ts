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
    car_model = '';
    resp: any = {};
    displayedColumns: string[] = ['first_name', 'last_name','email','car_make','car_model','manufactured_date','deleteAction'];
  // dataSource : Vehicle[];
    // datasource 
    dataSource = new MatTableDataSource<Vehicle>([]);
    //dataSource = new MatTableDataSource<Vehicle>[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any;
    
    constructor(private apollo: Apollo,private vehicleService:VehicleService,private _snackBar: MatSnackBar) { }

      ngOnInit(): void {
      this.apollo.query({
        query: gql `{vehicles(page:1,newest:false) {
          id
          first_name
          last_name
          email
          car_make
          car_model
          vin_number
          manufactured_date }
      }`
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.vehicles;
        this.vehicles = this.resp.data.vehicles
        console.log(this.data);
        console.log(this.dataSource.data);
      //  this.isLoadingResults = false;
      });
    }
    searchCarModel(): void{
      
    // &car_model = this.car_model;
      this.apollo.query({
        query: gql `
          query($car_model:String!)
            { vehicleByModel(carModel:$car_model)
              {
                id
                first_name
                last_name
                email
                car_make
                car_model
                vin_number
                manufactured_date 
            }
            }
        `,
      variables: {
        car_model: this.car_model
      }
          
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.vehicles;
        if(this.resp.data.vehicleByModel.length===undefined){
          this.dataSource.data  = [{
            age_of_vehicle: this.resp.data.vehicleByModel.age_of_vehicle,
            car_make: this.resp.data.vehicleByModel.car_make,
            car_model: this.resp.data.vehicleByModel.car_model,
            email: this.resp.data.vehicleByModel.email,
            first_name: this.resp.data.vehicleByModel.first_name,
            id: this.resp.data.vehicleByModel.id,
            last_name: this.resp.data.vehicleByModel.last_name,
            manufactured_date: this.resp.data.vehicleByModel.manufactured_date,
            vin_number: this.resp.data.vehicleByModel.vin_number,
          }];
          this.vehicles = this.resp.data.vehicleByModel;
          }else{
            this.vehicles = this.resp.data.vehicleByModel;
            this.dataSource.data=this.resp.data.vehicleByModel;
          }
      
      //  this.isLoadingResults = false;
      });
    }
    
    update(index):void{
      let updatedVehicle = this.vehicles[index];
      this.apollo.mutate({
        mutation: gql`
        mutation updateVehicle {
          updateVehicle(id: 1,first_name: "Florind",
            last_name: "Castagnone",
            email: "Butere",
            car_make: "Volvo",
            car_model: "240",
            vin_number: "WBAKB0C56BC647513",
            manufactured_date: "548879400000",
            age_of_vehicle: "33.87849045535261") {
            first_name
            last_name
          }
        }
      `,
        variables: {
          id: this.car_model
        }
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.dataSource.data = this.resp.data.vehicles;
        this.vehicles = this.resp.data.vehicles
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
