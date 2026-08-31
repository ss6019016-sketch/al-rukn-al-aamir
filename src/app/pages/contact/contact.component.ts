import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  submitted = false;
  submitting = false;

  submit(): void {
    this.submitting = true;

    // ⚠️ BACKEND PENDING — replace this with the real API call once ready.
    // Keeping the fake delay so the loading state is visible for now.
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
    }, 800);
  }
}