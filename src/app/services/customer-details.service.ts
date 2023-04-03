import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  private dataUrl='http://localhost:8080';

  constructor(private http: HttpClient) { }

  saveCustomerDetails(customerDetails: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.dataUrl}/create/detail`, JSON.stringify(customerDetails), {headers: headers, responseType: 'text'});
 
  }

  
}
