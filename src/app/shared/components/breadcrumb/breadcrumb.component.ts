import { Component, Input } from '@angular/core';

interface BreadcrumbItem {
  label: string;
  link?: string;
  queryParams?: { [key: string]: string };
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input() category = '';
  @Input() subcategory = '';
  @Input() categoryQuery: { [key: string]: string } | null = null;
  @Input() product = '';

  get items(): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
      { label: 'Home', link: '/' },
      { label: 'Shop', link: '/shop' },
    ];
    if (this.category) items.push({ label: this.category, link: '/shop', queryParams: this.categoryQuery || undefined });
    if (this.subcategory) items.push({ label: this.subcategory });
    if (this.product) items.push({ label: this.product });
    return items;
  }
}
