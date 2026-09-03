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
  closing = false;
  modeSwitching = false;

  switchMode(mode: 'login' | 'register'): void {
    if (mode === this.mode) return;
    this.modeSwitching = true;
    setTimeout(() => {
      this.mode = mode;
      this.modeSwitching = false;
    }, 150);
  }

  close(): void {
    this.closing = true;
    setTimeout(() => {
      this.closing = false;
      this.closeModal.emit();
    }, 220);
  }

  submit(): void {
    alert('This is a demo — account features will be enabled once backend is connected.');
    this.close();
  }
}