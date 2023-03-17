import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate  {

    constructor( private gs: GeneralService) { }

    canActivate(route, state: RouterStateSnapshot) {
        if (this.gs.isValidRoute()) {
            return true;
        } else {
            return true;
        }
    }

}
