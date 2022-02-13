import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
@Injectable({providedIn: 'root'})
export class AuthService {
    public constructor(private http: HttpClient, private router: Router) {}

    public refreshToken(
        token: string
    ): Observable<{access: string; refresh: string}> {
        return this.http.post<{access: string; refresh: string}>(
            `/api/auth/refresh`,
            {
                refreshToken: token,
            }
        );
    }

    public storeTokens(tokens: {access: string; refresh: string}): void {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
    }

    public getAccessToken(): string {
        return localStorage.getItem('access') as string;
    }

    public getRefreshToken(): string {
        return localStorage.getItem('refresh') as string;
    }

    public logout(): void {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigateByUrl('/login');
    }
}
