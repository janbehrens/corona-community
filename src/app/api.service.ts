import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private offersUrl = `${environment.backendUrl}/offers`;
  private requestsUrl = `${environment.backendUrl}/requests`;

  constructor(private http: HttpClient) { }

  saveOffer(offer: HelpOffer) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<HelpOffer>(this.offersUrl, offer, options).toPromise();
  }

  saveRequest(request: HelpRequest) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<HelpRequest>(this.requestsUrl, request, options).toPromise();
  }

  getOffers() {
    return this.http.get<HelpOffer[]>(this.offersUrl).toPromise();
  }

  getRequests() {
    return this.http.get<HelpRequest[]>(this.requestsUrl).toPromise();
  }
}
