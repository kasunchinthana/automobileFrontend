import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { DELETE_VEHICLE_QUERY, RETRIEVE_VEHICLE_QUERY, SEARCH_CAR_MODEL_QUERY, UPDATE_VEHICLE_QUERY } from '../../shared/graphql.query';

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
  private query: QueryRef<any>;
  id = '';
  resp: any = {};
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'carMake', 'carModel', 'manufacturedDate', 'deleteAction'];

  dataSource = new MatTableDataSource<Vehicle>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: any;

  constructor(private apollo: Apollo, private vehicleService: VehicleService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveVehicle(false);
  }

  searchCarModel(): void {
    this.query = this.apollo.watchQuery({
      query: SEARCH_CAR_MODEL_QUERY,
      variables: { carModel: this.carModel }
    });

    this.query.valueChanges.subscribe(res => {
      this.resp = res;
      this.data = this.resp.data;
      this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes);
      this.dataSource.data = this.vehicles;
    });
  }

  update(index): void {
    let updatedVehicle = this.vehicles[index];
    this.apollo.mutate({
      mutation: UPDATE_VEHICLE_QUERY,
      variables: {
        id: updatedVehicle.id,
        firstName: updatedVehicle.firstName
      }
    }).subscribe(
      res => {
        this.currentIndex = -1;
        this.resp = res;
        this.data = this.resp.data;
        this.refreshGrid();
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

  retrieveVehicle(isNext) {
    this.query = this.apollo.watchQuery({
      query: RETRIEVE_VEHICLE_QUERY,
      variables: {
        carModel: this.carModel,
        after: this.after
      }
    });
    this.query.valueChanges.subscribe(res => {
      this.resp = res;
      this.data = this.resp.data;
      this.resultsLength = this.data.allVehicles.totalCount;
      let curser = this.data.allVehicles.pageInfo.endCursor;
      this.after = '"' + curser + '"';
      if (isNext) {
        //this.vehicles.push(...this.recreateJsonObject(this.data.allVehicles.nodes)) ;
        this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes);
      } else {
        this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes);
      }
      this.dataSource = new MatTableDataSource(this.vehicles);
    });
  }
  public getPaginatorData(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    //retrieveVehicle();
    this.iterator(true);
  }
  iterator(isNext) {
    this.retrieveVehicle(isNext)
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
    this.apollo.mutate({
      mutation: DELETE_VEHICLE_QUERY,
      variables: { id: updatedVehicle.id }
    }).subscribe(
      res => {
        this.currentIndex = -1;
        this.resp = res;
        this.data = this.resp.data;
        this.refreshGrid();
      });
  }

  refreshGrid(){
    this.query = this.apollo.watchQuery({
      query: RETRIEVE_VEHICLE_QUERY,
      variables: {
        carModel: this.carModel,
        after: null
      }
    });
    this.query.valueChanges.subscribe(res => {
      this.resp = res;
      this.data = this.resp.data;
      this.resultsLength = this.data.allVehicles.totalCount;
      let curser = this.data.allVehicles.pageInfo.endCursor;
      this.after = '"' + curser + '"';
        this.vehicles = this.recreateJsonObject(this.data.allVehicles.nodes);
      this.dataSource = new MatTableDataSource(this.vehicles);
    });
  }

}

