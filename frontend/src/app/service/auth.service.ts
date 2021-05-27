import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string;
  private userStatus = false;

  public constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // public register() {}

  public login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: any) => localStorage.setItem('accessToken', res.accessToken))
      );
  }

  public isLoggedIn(): boolean {
    return (this.userStatus = !!localStorage.getItem('accessToken'));
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }
}
