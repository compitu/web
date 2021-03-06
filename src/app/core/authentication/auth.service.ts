import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginPayload} from './login-payload';
import {User} from './user';

@Injectable({providedIn: 'root'})
export class AuthService {
    public constructor(private http: HttpClient) {}

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

    public stroreUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getAccessToken(): string {
        return localStorage.getItem('access') as string;
    }

    public getRefreshToken(): string {
        return localStorage.getItem('refresh') as string;
    }

    public login(email: string, password: string): Observable<LoginPayload> {
        return this.http.post<LoginPayload>('/api/auth/login', {
            email,
            password,
        });
    }

    public signup(email: string, password: string): Observable<User> {
        return this.http.post<User>('/api/auth/signup', {
            email,
            password,
        });
    }

    public clearTokens(): void {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
    }

    public fetchUser(): Observable<User | undefined> {
        const userString = localStorage.getItem('user');
        const user = userString ? (JSON.parse(userString) as User) : undefined;
        return this.http.get<User>(`api/users/${user?.id}`);
    }
}
