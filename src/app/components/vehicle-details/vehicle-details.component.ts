import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

 
  currentVehicle?:Vehicle;
  message = '';

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getVehicle(this.route.snapshot.params.id);
  }

  getVehicle(id): void {
    this.vehicleService.get(id)
      .subscribe(
        data => {
          this.currentVehicle = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  /* updatePublished(status: boolean): void {
    const data = {
      first_name: this.currentVehicle.first_name,
      last_name: this.currentVehicle.last_name
    };

    this.apiService.updateVehicle(this.currentVehicle.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.id.toString();
        },
        error => {
          console.log(error);
        });
  }
 */
  updateVehicle(): void {
    this.vehicleService.update(this.currentVehicle.id, this.currentVehicle)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.id.toString();
        },
        error => {
          console.log(error);
        });
  }

  deleteVehicle(): void {
    this.vehicleService.delete(this.currentVehicle.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['api/vehicle']);
        },
        error => {
          console.log(error);
        });
  }

}
