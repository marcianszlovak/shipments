import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/shipment`, {});
  }

  public getById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/shipment/${id}`);
  }
}
