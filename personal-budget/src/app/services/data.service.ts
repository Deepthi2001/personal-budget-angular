import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private budgetData = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) {}


  getBudgetData(): Observable<any> {
    if (!this.budgetData.value)  {
      this.http.get(this.apiUrl).subscribe((data) => this.budgetData.next(data));
    }
    return this.budgetData.asObservable();
  }
}
