import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor( private processHTTPMsgService: ProcessHTTPMsgService,
    private http: HttpClient) { }

    getLeaders(): Observable<Leader[]> {
      return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));  

    } 
    
    getLeader(id: string): Observable<Leader> {
      return this.http.get<Leader>(baseURL + 'leadership/' + id ).pipe(catchError(this.processHTTPMsgService.handleError));

    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));

    }

    getLeaderIds(): Observable<string[] | any> {
      return this.getLeaders().pipe(map(LEADERS => LEADERS.map(Leader => Leader.id))).pipe(catchError(error => error));    

    }

    
     
   }
