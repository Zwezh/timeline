import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ResourceTemplatesService {

  constructor(private http: HttpClient) { }

  public post: (url: string, dataContract: any) => Observable<any> = (url: string, dataContract: any) => {
    const data = new Observable((observer: any) => {
      this.http.post(url, dataContract)
        .subscribe(
          (response: any) => {
            if (response.value === undefined) {
              observer.next(response);
            } else { observer.next(response.value); }
          },
          (readHttpError) => observer.error(readHttpError)
        );
    });
    return data;
  }

  public get: (url: string, params: any) => Observable<any> = (url: string, params: any) => {
    const data = new Observable((observer: any) => {
      this.http.get(url, { params })
        .subscribe(
          (response: any) => {
            if (response.value === undefined) {
              observer.next(response);
            } else { observer.next(response.value); }
          },
          (readHttpError) => observer.error(readHttpError)
        );
    });
    return data;
  }
}
