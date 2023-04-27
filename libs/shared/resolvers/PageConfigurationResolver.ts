import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { InternationalizationConfig } from '../models/InternationalizationConfig';
import { InternationalizationService } from '../services/InternationalizationService';
@Injectable({ providedIn: 'root' })
export class PageConfigurationResolver
  implements Resolve<InternationalizationConfig>
{
  constructor(
    private internationalizationService: InternationalizationService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let pageName = state.url.substring(
      state.url.lastIndexOf('/') + 1,
      state.url.length
    );
    const language = sessionStorage.getItem('LANGUAGE') ?? 'EN';

    if (pageName.includes('?')) {
      pageName = pageName.split('?')[0] + '.' + language.toLowerCase();
    } else {
      pageName = pageName + '.' + language.toLowerCase();
    }

    return this.internationalizationService.getConfig(pageName);
  }
}
