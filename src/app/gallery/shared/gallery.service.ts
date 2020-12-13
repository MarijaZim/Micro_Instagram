import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../image';
import {tap} from 'rxjs/operators';

@Injectable()
export class GalleryService{
  private url = 'https://jsonplaceholder.typicode.com/photos';
  images: any[];
  constructor(private http: HttpClient) {
    this.images = [];
  }
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.url);
  }
  getImage(id: number): Observable<Image>{
    return this.http.get<Image>(this.url + '/' + id);
  }
  addImage(image: Image): Observable<Image>{
    console.log(`vo servis za add`);
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(image);
    return this.http.post<Image>(this.url, body, {headers: header});
  }
  deleteImage(id: number): Observable<{}>{
    const header =  new HttpHeaders({'Content-Type': 'application/json'});
    const httpUrl = this.url + '/' + id;
    return this.http.delete(httpUrl, {headers: header}).pipe(
      tap(data => console.log('delete Product: ' + id))
    );
  }
  updateImage(image: Image): Observable<void>{
    console.log(`vo servis za edit`);
    const header =  new HttpHeaders({'Content-Type': 'application/json'});
    const id = image.id;
    const body = JSON.stringify(image);
    return this.http.put<void>(this.url + '/' + id, body, {headers: header} );
  }

}

