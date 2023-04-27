import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InternationalizationConfig } from '../models/InternationalizationConfig';

@Injectable({
  providedIn: 'root',
})
export class InternationalizationService {
  constructor(private httpClient: HttpClient) {}
  getConfig(pageName: string) {
    return this.httpClient.get<InternationalizationConfig>(
      `Config/${pageName}`
    );
  }
}
