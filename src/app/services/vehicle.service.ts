import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';

//const baseUrl = 'http://localhost:3000/api/vehicle';
const baseUrl = 'http://localhost:3000/vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Vehicle[]> {
    console.log(this.http.get<Vehicle[]>(baseUrl));
    return this.http.get<Vehicle[]>(baseUrl);
  }

  get(id: any): Observable<Vehicle> {
    return this.http.get(`${baseUrl}/${id}`);
  }

 
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


  findByFirstName(first_name: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${baseUrl}?firstName=${first_name}`);
  }

  findByCarModel(car_model: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${baseUrl}?carModel=${car_model}`);
  }
}
