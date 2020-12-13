import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../album/album';

@Injectable()
export class AlbumService{
  private url = 'http://jsonplaceholder.typicode.com/albums';
  albums: any[];
  constructor(private http: HttpClient) {
    this.albums = [];
  }
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url);
  }
  getAlbum(id: number): Observable<Album>{
    return this.http.get<Album>(this.url + '/' + id);
  }
}
