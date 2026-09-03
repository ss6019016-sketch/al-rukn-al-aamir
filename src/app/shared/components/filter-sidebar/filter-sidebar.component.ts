import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';

export interface ProductFilters {
  minPrice: number;
  maxPrice: number;
  brands: string[];
  ram: string[];
  storage: string[];
  screenSize: string[];
  conditions: string[];
}

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css'],
})
export class FilterSidebarComponent implements OnChanges, AfterViewInit {
  @Input() products: Product[] = [];
  @Output() filtersApplied = new EventEmitter<ProductFilters>();

  @ViewChild('filterContent') filterContentRef!: ElementRef<HTMLElement>;

  filterOpen = true;
  contentHeight = 0;

  minPrice = 0;
  maxPrice = 0;
  selectedMinPrice = 0;
  selectedMaxPrice = 0;
  selectedBrands: string[] = [];
  selectedRam: string[] = [];
  selectedStorage: string[] = [];
  selectedScreenSizes: string[] = [];
  selectedConditions: string[] = [];

  brands: string[] = [];
  ramOptions: string[] = [];
  storageOptions: string[] = [];
  screenSizes: string[] = [];
  conditions = ['New', 'Renewed', 'Refurbished'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.buildOptions();
      // content changed, remeasure height on next tick
      setTimeout(() => this.measureHeight(), 0);
    }
  }

  ngAfterViewInit(): void {
    this.measureHeight();
  }

  private measureHeight(): void {
    if (this.filterContentRef?.nativeElement) {
      this.contentHeight = this.filterContentRef.nativeElement.scrollHeight;
    }
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
    if (this.filterOpen) {
      // remeasure in case content size changed while closed
      setTimeout(() => this.measureHeight(), 0);
    }
  }

  clearAll(): void {
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
    this.selectedBrands = [];
    this.selectedRam = [];
    this.selectedStorage = [];
    this.selectedScreenSizes = [];
    this.selectedConditions = [];
    this.apply();
  }

  apply(): void {
    this.filtersApplied.emit({
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice,
      brands: [...this.selectedBrands],
      ram: [...this.selectedRam],
      storage: [...this.selectedStorage],
      screenSize: [...this.selectedScreenSizes],
      conditions: [...this.selectedConditions],
    });
  }

  toggleSelection(selection: string[], value: string): void {
    const index = selection.indexOf(value);
    if (index === -1) {
      selection.push(value);
    } else {
      selection.splice(index, 1);
    }
  }

  isSelected(selection: string[], value: string): boolean {
    return selection.includes(value);
  }

  productRam(product: Product): string {
    return this.specValue(product, 'ram');
  }

  productStorage(product: Product): string {
    return this.specValue(product, 'storage');
  }

  productScreenSize(product: Product): string {
    return this.specValue(product, 'screen');
  }

  productCondition(product: Product): string {
    const name = product.name.toLowerCase();
    if (name.includes('refurbished')) return 'Refurbished';
    if (name.includes('renewed')) return 'Renewed';
    return 'New';
  }

  private buildOptions(): void {
    const prices = this.products.map((product) => this.productPrice(product));
    this.minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
    this.maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 0;
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
    this.brands = this.unique(this.products.map((product) => product.brand));
    this.ramOptions = this.unique(this.products.map((product) => this.productRam(product)).filter(Boolean));
    this.storageOptions = this.unique(this.products.map((product) => this.productStorage(product)).filter(Boolean));
    this.screenSizes = this.unique(this.products.map((product) => this.productScreenSize(product)).filter(Boolean));
  }

  private productPrice(product: Product): number {
    return product.priceRange?.min ?? product.price;
  }

  private specValue(product: Product, keyword: string): string {
    const spec = product.specs?.find((item) => item.label.toLowerCase().includes(keyword));
    if (spec) return spec.value;
    const match = product.name.match(keyword === 'ram' ? /\d+\s*GB\s*RAM/i : keyword === 'storage' ? /\d+\s*(?:GB|TB)\s*(?:SSD|HDD)/i : /\d+(?:\.\d+)?[- ]?inch/i);
    return match?.[0] || '';
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)].sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));
  }
}