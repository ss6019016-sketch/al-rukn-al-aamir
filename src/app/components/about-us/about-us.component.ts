import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  stats = [
    { value: '20+', label: 'Years of Service' },
    { value: '10K+', label: 'Devices Renewed' },
  ];
}
