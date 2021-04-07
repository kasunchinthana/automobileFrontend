import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  displayedColumns: string[] = ['first_name', 'last_name','email','car_make','car_model','manufactured_date','deleteAction'];
 // dataSource : Vehicle[];
  // datasource 
  dataSource = new MatTableDataSource<Vehicle>([]);
  //dataSource = new MatTableDataSource<Vehicle>[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private vehicleService:VehicleService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveVehicle();
  }
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }
  
  retrieveVehicle(): void {
    this.vehicleService.getAll().subscribe( (data:Vehicle[]) => {
      this.vehicles = data;
          this.dataSource.data = data;
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

  onRowClicked(index): void {
    this.currentIndex = index;
  }
  searchCarModel(): void {
    this.vehicleService.findByCarModel(this.car_model).subscribe((res:any ) => {
    
        //this.dataSource = new MatTableDataSource(data);
        if(res.length===undefined){
        this.dataSource.data  = [{
          age_of_vehicle: res.age_of_vehicle,
          car_make: res.car_make,
          car_model: res.car_model,
          email: res.email,
          first_name: res.first_name,
          id: res.id,
          last_name: res.last_name,
          manufactured_date: res.manufactured_date,
          vin_number: res.vin_number,
        }];
        this.vehicles = res;
        }else{
          this.vehicles = res;
          this.dataSource.data=res;
        }
     
        
      },
      error => {
        console.log(error);
      });
  }
  update(index):void{
   
    let updatedVehicle = this.vehicles[index];
    this.vehicleService.update(updatedVehicle.id, updatedVehicle)
      .subscribe(
        response => {
          console.log(response);
          this._snackBar.open('succesfully updated', '', {
            duration: 2000,
          });
          this.currentIndex=-1;
        },
        error => {
          console.log(error);
          this._snackBar.open('error occured', '', {
            duration: 2000,
          });
          this.currentIndex=-1;
        });
       
        
  }

  delete(index): void {
    let updatedVehicle = this.vehicles[index];
    this.vehicleService.delete(this.currentVehicle.id)
      .subscribe(
        response => {
          console.log(response);
          this._snackBar.open('succesfully deleted', '', {
            duration: 2000,
          });
          this.currentIndex=-1;
         // this.router.navigate(['api/vehicle']);
        },
        error => {
          console.log(error);
          this._snackBar.open('error', '', {
            duration: 2000,
          });
          this.currentIndex=-1;
        });
      }
}