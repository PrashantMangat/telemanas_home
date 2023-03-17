import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class PassGuardService implements CanActivate {

    constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {

    }
    canActivate(route, state: RouterStateSnapshot) {
        if (this.authService.isUpdate()) {
            return true;
        } else {
            this.logOut();
            return false;
        }
    }
    logOut() {
        this.authService.logout().subscribe(response => {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['login']);
        }, (error) => {
            this.snackBar.open(error.json().message, 'x', {
                duration: 5000,
            });
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['login']);
        });
    }
}
