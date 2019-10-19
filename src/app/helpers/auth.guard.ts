import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    /**
     * Crea la instancia del helper authGuard
     * @param router 
     * @param authenticationService 
     */
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // Seccion de codigo para manejar los roles si es necesario
            /*if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }*/

            // authorised so return true
            return true;
        }

        // Si no esta logueado redirecciona al home
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}