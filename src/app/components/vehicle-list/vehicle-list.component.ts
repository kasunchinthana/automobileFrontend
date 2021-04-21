import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    name = "kasun";
    //@Input()
  //   firstName : string;
  //   @Input()
  // version: number;
  // @Output()
  // readonly release: EventEmitter<void> = new EventEmitter();

    id ='';
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
        this.retrieveVehicle();
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
        mutation updateVehicleById($id:ID!,$firstName:String){
          updateVehicleById(id: $id, firstName: $firstName) {
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
        variables: {id:updatedVehicle.id,
          firstName: updatedVehicle.firstName
        }
      }).subscribe(res => {
        this.currentIndex=-1;
        this.resp = res;
        this.data = this.resp.data;
       this.retrieveVehicle();
       // this.dataSource.data = this.resp.data.updateVehicleById;
       // this.dataSource.data = this.recreateJsonObject(this.resp.data.updateVehicleById) ;
        // if(this.data instanceof Object){
        // this.dataSource.data  = [{
        //     //carMake: this.resp.data.allVehicles[0].carMake,
        //     carModel : this.resp.data.updateVehicleById.carModel,
        //      email : this.resp.data.updateVehicleById.email,
        //     firstName :this.resp.data.updateVehicleById.firstName,
        //      id : this.resp.data.updateVehicleById.id,
        //      lastName : this.resp.data.updateVehicleById.lastName,
        //      manufacturedDate :this.resp.data.updateVehicleById.manufacturedDate,
        //      vinNumber : this.resp.data.updateVehicleById.vinNumber,
        //   }];
        // }
        
       // this.vehicles = this.resp.data.updateVehicleById;
       // console.log(this.data);
       // console.log(this.dataSource.data);
      //  this.isLoadingResults = false;
      });
        
          
    }
    onRowClicked(index): void {
    //  this.release.emit();
    this.currentIndex = index;
    }

    
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   
  }

   refreshList(): void {
    //this.retrieveVehicle();
    this.currentVehicle = undefined;
    this.currentIndex = -1;
  }
  
  retrieveVehicle(){
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
       // let xyz any = '';
       //let xyz: any = [];
        //Object.assign(xyz,this.data.allVehicles);
        this.vehicles = this.recreateJsonObject(this.data.allVehicles) ;
        this.dataSource.data = this.vehicles;
        
        //this.vehicles = this.resp.data.allVehicles
        console.log(this.data);
        console.log(this.dataSource.data);
        this.currentIndex=-1;
      //  this.isLoadingResults = false;
      });
  } 

  y(event,element){
    element.firstName = event;
  }

  public recreateJsonObject(object: any): any {

    let obj: string = this.objectToJson(object);
    return this.jsonStringToObject(obj);
  }

  /**
   * convert and return given object to json string
   * @param object
   * @returns {string}
   */
   public objectToJson(object: any): string {
    if (object) {
      return JSON.stringify(object);
    } else {
      return null;
    }
  }

  /**
   * create & return given json string to json object
   * @param {string} jsonStr
   * @returns {Object}
   */
  public jsonStringToObject(jsonStr: string): Object {
    if (jsonStr && jsonStr.length > 0) {
      return JSON.parse(jsonStr);
    }
  }
}
  
  
    

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
  //   this.apollo.mutate({ mutation: gql` mutation  { 
  //     deleteVehicle{
  //       deleteVehicle(id: "006a5f3e-8850-48c9-8de5-ef9d2c9516c6" ){  
  //           id
  //           firstName
  //           lastName
  //           email
  //           carMake
  //           carModel
  //           vinNumber
  //           manufacturedDate
  //           ageOfVehicle    
  //       }
  //     }



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
