import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  mode: 'login' | 'register' = 'login';
  email = '';
  password = '';

  switchMode(mode: 'login' | 'register'): void {
    this.mode = mode;
  }

  close(): void {
    this.closeModal.emit();
  }

  submit(): void {
    // Dummy submit — backend abhi nahi hai
    alert('This is a demo — account features will be enabled once backend is connected.');
    this.close();
  }
}