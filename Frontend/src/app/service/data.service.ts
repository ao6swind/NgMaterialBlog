import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  public find(resource: string, id: any) {
    return this.http.get(`${this.apiUrl}/${resource}/${id}`);
  }

  public list(resource: string, page: number = 1, size: number = 10) {
    console.log(`${this.apiUrl}/${resource}/${page}/${size}`);
    return this.http.get(`${this.apiUrl}/${resource}/${page}/${size}`);
  }

  public create(resource: string, data: any) {
    return this.http.post(`${this.apiUrl}/${resource}`, data);
  }

  public update(resource: string, id: any, data: any) {
    return this.http.put(`${this.apiUrl}/${resource}/${id}`, data);
  }

  public delete(resource: string, id: any) {
    return this.http.delete(`${this.apiUrl}/${resource}/${id}`);
  }
  
}
