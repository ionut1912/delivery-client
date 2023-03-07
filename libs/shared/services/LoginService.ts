import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {




  handleResponseFromState() {
    if (window.location.search.includes('state')) {
      const response = window.location.search.split('?state=')[1];

      const decodedResponse = window.atob(response);

      const userDetailsObject = JSON.parse(decodedResponse);

      sessionStorage.setItem('jwt', userDetailsObject['jwt']);
      sessionStorage.setItem('email', userDetailsObject['email']);

      const refresh = window.location.origin + window.location.pathname + '';

      window.history.replaceState(null, '', refresh);
    }
  }
}
