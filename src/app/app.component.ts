import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebAuthnService } from './services/webauthn/webauthn.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="auth-container">
      <h1>Web Biometrics in Angular</h1>
      <button (click)="register()">Register with Fingerprint</button>
      <button (click)="login()">Login with Face ID</button>
      <p *ngIf="message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">{{ message }}</p>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-webauthn';
  message: string | null = null; // Message to display feedback to the user
  isSuccess: boolean = false; // Indicates if the last action was successful

  constructor(private readonly _webAuthnService: WebAuthnService) { }

  // Trigger registration process and update the UI based on the outcome
  async register() {
    try {
      await this._webAuthnService.register();
      this.message = "Registration successful!"; // Success message if registration works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Registration failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }

  // Trigger authentication process and update the UI based on the outcome
  async login() {
    try {
      await this._webAuthnService.authenticate();
      this.message = "Authentication successful!"; // Success message if authentication works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Authentication failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }
}
