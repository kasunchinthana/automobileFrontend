import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  public pageSize = 100;
  public currentPage = 0;
  public totalSize = 0;

    vehicles?: Vehicle[];
    currentVehicle?: Vehicle;
    currentIndex = -1;
    carModel = '';
    after = null;
    resultsLength = 0;
    //name = "kasun";
    pageEvent: PageEvent;

    id ='';
    resp: any = {};
    displayedColumns: string[] = ['firstName', 'lastName','email','carMake','carModel','manufacturedDate','deleteAction'];

    dataSource = new MatTableDataSource<Vehicle>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any;
    
    constructor(private apollo: Apollo,private vehicleService:VehicleService,private _snackBar: MatSnackBar) { }

      ngOnInit(): void {
        this.retrieveVehicle(false);
      }

    searchCarModel(): void{
      this.apollo.query({
        query: gql `
          query($carModel:String!){ 
            allVehicles(carModel:$carModel,first: 100, after: null){
              pageInfo {
                hasNextPage
                endCursor
              }
              totalCount
              nodes {
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
            }
          }
        `,
      variables: {
        carModel: this.carModel
      }
          
      }).subscribe(res => {
        this.resp = res;
        this.data = this.resp.data;
        this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes) ;
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
       this.retrieveVehicle(false);       
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
  
  retrieveVehicle(isNext){
    this.apollo.query({
        query: gql ` 
        query($carModel:String!,$after:String){
          allVehicles(carModel: $carModel, first: 100, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
            nodes {
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
          }
        }
        `,
         variables: {
          carModel: this.carModel,
          after:this.after
        }
       }).subscribe( 
        res => {
          this.resp = res;
          this.data = this.resp.data;
          
          
         this.resultsLength = this.data.allVehicles.totalCount;
          let curser = this.data.allVehicles.pageInfo.endCursor ;
          this.after =  '"' + curser + '"';
          if (isNext){
            //this.vehicles.push(...this.recreateJsonObject(this.data.allVehicles.nodes)) ;
            this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes) ;
          }else {
            this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes) ;
          }
        
         this.dataSource = new MatTableDataSource(this.vehicles);
         // this.dataSource.paginator = this.paginator;
      });
  } 
  public getPaginatorData(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    //retrieveVehicle();
    this.iterator(true);
  }
  iterator(isNext){
    this.retrieveVehicle(isNext)
    // const end = (this.currentPage + 1) * this.pageSize;
    // const start = this.currentPage * this.pageSize;
    
    // const part =this.vehicles.slice(start, end);
    
    //  this.dataSource.data = part;
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
        this.retrieveVehicle(false);  
    });
  }

 
}  

