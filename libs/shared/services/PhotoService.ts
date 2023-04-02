import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private httpClient: HttpClient) {}
  modifyMainPhoto(photo: FormData) {
    this.httpClient.put('Photos', photo).subscribe(() => console.log('test'));
  }
}
