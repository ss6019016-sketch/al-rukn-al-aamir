import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductFilters } from '../../shared/components/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  private readonly productsPerLoad = 12;
  products: Product[] = [];
  visibleCount = this.productsPerLoad;
  allProducts: Product[] = [];
  activeFilters: ProductFilters = {
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    brands: [],
    ram: [],
    storage: [],
    screenSize: [],
    conditions: [],
  };
  category = '';
  brand = '';
  search = '';
  tag = '';
  sort = 'default';
  breadcrumbCategory = '';
  breadcrumbSubcategory = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getAllProducts();
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.brand = params.get('brand') || '';
      this.search = params.get('search') || '';
      this.tag = params.get('tag') || '';
      this.sort = params.get('sort') || 'default';
      this.breadcrumbCategory = this.category || (this.brand ? 'Brand' : 'All Products');
      this.breadcrumbSubcategory = this.brand || '';
      this.visibleCount = this.productsPerLoad;
      this.products = this.getFilteredProducts(this.activeFilters);
    });
  }

  get pageTitle(): string {
    return this.search || this.brand || this.category || 'All Products';
  }

  applyFilters(filters: ProductFilters): void {
    this.activeFilters = filters;
    this.visibleCount = this.productsPerLoad;
    this.products = this.getFilteredProducts(filters);
  }

  get visibleProducts(): Product[] {
    return this.products.slice(0, this.visibleCount);
  }

  loadMore(): void {
    this.visibleCount += this.productsPerLoad;
  }

  changeSort(sort: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sort === 'default' ? null : sort },
      queryParamsHandling: 'merge',
    });
  }

  private getFilteredProducts(filters: ProductFilters): Product[] {
    const searchTerm = this.search.toLowerCase();
    const categoryTerm = this.category.toLowerCase();
    const brandTerm = this.brand.toLowerCase();
    const filteredProducts = this.allProducts.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
      return (!searchTerm || searchable.includes(searchTerm))
        && (!categoryTerm || product.category.toLowerCase().includes(categoryTerm))
        && (!brandTerm || product.brand.toLowerCase() === brandTerm)
        && this.matchesTag(product)
        && this.matchesSidebarFilters(product, filters);
    });
    return this.sortProducts(filteredProducts);
  }

  private sortProducts(products: Product[]): Product[] {
    return [...products].sort((first, second) => {
      const firstPrice = first.priceRange?.min ?? first.price;
      const secondPrice = second.priceRange?.min ?? second.price;
      if (this.sort === 'price-low') return firstPrice - secondPrice;
      if (this.sort === 'price-high') return secondPrice - firstPrice;
      if (this.sort === 'newest') return second.id - first.id;
      if (this.sort === 'rating') return (second.rating || 0) - (first.rating || 0);
      return 0;
    });
  }

  private matchesTag(product: Product): boolean {
    if (!this.tag) return true;

    const tagTerm = this.normalise(this.tag.replace(/-/g, ' '));
    const specs = product.specs || [];
    const searchable = this.normalise([
      product.name,
      product.category,
      product.brand,
      ...specs.flatMap((spec) => [spec.label, spec.value]),
    ].join(' '));

    if (tagTerm === 'ssd card') return searchable.includes('ssd');
    if (tagTerm === 'graphic card') return searchable.includes('graphic');
    return tagTerm.split(' ').every((term) => searchable.includes(term));
  }

  private normalise(value: string): string {
    return value
      .toLowerCase()
      .replace(/inches/g, 'inch')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  private matchesSidebarFilters(product: Product, filters: ProductFilters): boolean {
    const price = product.priceRange?.min ?? product.price;
    const specValue = (keyword: string): string =>
      product.specs?.find((spec) => spec.label.toLowerCase().includes(keyword))?.value.toLowerCase() || product.name.toLowerCase();
    const condition = product.name.toLowerCase().includes('refurbished')
      ? 'Refurbished'
      : product.name.toLowerCase().includes('renewed') ? 'Renewed' : 'New';
    return price >= filters.minPrice && price <= filters.maxPrice
      && (!filters.brands.length || filters.brands.includes(product.brand))
      && (!filters.ram.length || filters.ram.some((value) => specValue('ram').includes(value.toLowerCase())))
      && (!filters.storage.length || filters.storage.some((value) => specValue('storage').includes(value.toLowerCase())))
      && (!filters.screenSize.length || filters.screenSize.some((value) => specValue('screen').includes(value.toLowerCase())))
      && (!filters.conditions.length || filters.conditions.includes(condition));
  }
}
