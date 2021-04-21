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

    id ='';
    resp: any = {};
    displayedColumns: string[] = ['firstName', 'lastName','email','carMake','carModel','manufacturedDate','deleteAction'];

    dataSource = new MatTableDataSource<Vehicle>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any;
    
    constructor(private apollo: Apollo,private vehicleService:VehicleService,private _snackBar: MatSnackBar) { }

      ngOnInit(): void {
        this.retrieveVehicle();
      }

    searchCarModel(): void{
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
        this.vehicles = this.recreateJsonObject(this.data.allVehicles) ;
        this.dataSource.data = this.vehicles;
       
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
      });         
    }
    onRowClicked(index): void {
    this.currentIndex = index;
    }

    
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   
  }

   refreshList(): void {
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
          this.vehicles = this.recreateJsonObject(this.data.allVehicles) ;
          this.dataSource.data = this.vehicles;
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

  delete(index): void {
    let updatedVehicle = this.vehicles[index];
    this.apollo.mutate({ mutation: gql`   
     mutation deleteVehicle($id:ID!){
        deleteVehicle(id:$id ){  
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
      }`,
      variables: {id:updatedVehicle.id}
       }).subscribe(res=>{
        this.currentIndex=-1;
        this.resp = res;
        this.data = this.resp.data;
        this.retrieveVehicle();  
    });
  }
}  

