import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

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
  displayedColumns: string[] = ['first_name', 'last_name','email','car_make','car_model','manufactured_date'];
  dataSource : Vehicle[];
  // datasource 
  //dataSource = new MatTableDataSource<Vehicle>(ELEMENT_DATA);
  //dataSource = new MatTableDataSource<Vehicle>[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.retrieveVehicle();
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  }
  retrieveVehicle(): void {
    this.vehicleService.getAll().subscribe(
        data => {
          this.vehicles = data;
          this.dataSource = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveVehicle();
    this.currentVehicle = undefined;
    this.currentIndex = -1;
  }

  onRowClicked(row): void {
    this.currentVehicle = row;
    this.currentIndex = row.id;
  }
  searchCarModel(): void {
    this.vehicleService.findByCarModel(this.car_model) .subscribe(
      data => {
        this.vehicles = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}