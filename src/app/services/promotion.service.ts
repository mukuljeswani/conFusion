import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor( private processHTTPMsgService: ProcessHTTPMsgService,
    private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'PROMOTIONS').pipe(catchError(this.processHTTPMsgService.handleError));  

  } 
  
  getPromotion(id: string): Observable<Promotion> {
  return this.http.get<Promotion>(baseURL + 'PROMOTIONS/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
       
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'PROMOTIONS?featured=true').pipe(map(PROMOTIONS => PROMOTIONS[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError)); 
   
  }

  getPromotionIds(): Observable<string[] | any> {
    return this.getPromotions().pipe(map(PROMOTIONS => PROMOTIONS.map(Promotion => Promotion.id))).pipe(catchError(error => error));   

  }

  putPromotion(promotion: Promotion): Observable<Promotion> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Promotion>(baseURL + 'PROMOTIONS/' + promotion.id, promotion, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }
}
