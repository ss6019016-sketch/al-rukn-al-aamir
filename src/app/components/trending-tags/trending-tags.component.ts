import { Component } from '@angular/core';

interface Tag {
  label: string;
  slug: string;
}

@Component({
  selector: 'app-trending-tags',
  templateUrl: './trending-tags.component.html',
  styleUrls: ['./trending-tags.component.css'],
})
export class TrendingTagsComponent {
  tags: Tag[] = [
    { label: '13 Inch Laptop', slug: '13-inch-laptop' },
    { label: '8GB RAM', slug: '8gb-ram' },
    { label: 'Business Series', slug: 'business-series' },
    { label: 'Core i5', slug: 'core-i5' },
    { label: 'Dell Latitude Series', slug: 'dell-latitude-series' },
    { label: 'Dell Precision', slug: 'dell-precision' },
    { label: 'Fingerprint Reader', slug: 'fingerprint-reader' },
    { label: 'Glossy Series Laptop', slug: 'glossy-series-laptop' },
    { label: 'Graphic Card', slug: 'graphic-card' },
    { label: 'HP Elite Book', slug: 'hp-elite-book' },
    { label: 'SSD Card', slug: 'ssd-card' },
    { label: 'ThinkPad', slug: 'thinkpad' },
    { label: 'Windows OS', slug: 'windows-os' },
  ];
}