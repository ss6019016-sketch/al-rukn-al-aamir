import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartItem, CartService } from '../../core/services/cart.service';

interface NavChild {
  label: string;
  link: string;
  queryParams?: { [key: string]: string };
}

interface NavItem {
  label: string;
  link: string;
  children?: NavChild[];
  mega?: boolean;
   _mobileOpen?: boolean;  
}

interface MegaLink {
  label: string;
  queryParams?: { [key: string]: string };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showAnnouncement = true;

  cartCount = 0;
  wishlistCount = 0;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  authModalOpen = false;
  cartDropdownOpen = false;

  searchTerm = '';
  selectedCategory = 'All Categories';
  categories = ['All Categories', 'Bussiness Series Laptop', 'Glossy Series Laptop', 'Graphic Laptop'];

  private categoryKeywordMap: { [label: string]: string } = {
    'Bussiness Series Laptop': 'Business',
    'Glossy Series Laptop': 'Glossy',
    'Graphic Laptop': 'Graphic',
  };

  navLinks: NavItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about-us' },
    {
      label: 'Shop',
      link: '/shop',
      mega: true,
      children: [
        { label: 'Bussiness Series Laptop', link: '/shop', queryParams: { category: 'Business' } },
        { label: 'Glossy Series Laptop', link: '/shop', queryParams: { category: 'Glossy' } },
        { label: 'Graphic Laptop', link: '/shop', queryParams: { category: 'Graphic' } },
      ],
    },
    { label: 'Wholesale', link: '/wholesale' },
    { label: 'Contact Us', link: '/contact-us' },
  ];

  megaCategories: MegaLink[] = [
    { label: 'Limited Stock', queryParams: {} },
    { label: 'Bussiness Series Laptop', queryParams: { category: 'Business' } },
    { label: 'Glossy Series Laptop', queryParams: { category: 'Glossy' } },
    { label: 'Graphic Laptop', queryParams: { category: 'Graphic' } },
  ];

  megaBrands: MegaLink[] = [
    { label: 'Dell', queryParams: { brand: 'Dell' } },
    { label: 'HP', queryParams: { brand: 'HP' } },
    { label: 'Lenovo', queryParams: { brand: 'Lenovo' } },
    { label: 'Microsoft', queryParams: { brand: 'Microsoft' } },
  ];

  megaBestSellers: MegaLink[] = [
    { label: 'HP EliteBook', queryParams: { search: 'EliteBook' } },
    { label: 'Dell Latitude Series', queryParams: { search: 'Latitude' } },
    { label: 'Dell Precision', queryParams: { search: 'Precision' } },
    { label: 'Lenovo ThinkPad', queryParams: { search: 'ThinkPad' } },
  ];

  megaOpen = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartCount().subscribe((count) => (this.cartCount = count));
    this.cartService.getCartItems().subscribe((items) => (this.cartItems = items));
    this.cartService.getCartTotal().subscribe((total) => (this.cartTotal = total));
    this.wishlistService.getWishlistCount().subscribe((count) => (this.wishlistCount = count));
  }

  closeAnnouncement(): void {
    this.showAnnouncement = false;
  }

  toggleMobileMega(item: any, event: Event) {
  // Only intercept tap on mobile/tablet (<=991px), desktop pe normal hover chalega
  if (window.innerWidth <= 991) {
    event.preventDefault();
    item._mobileOpen = !item._mobileOpen;
  }
}

  openMega(): void {
    this.megaOpen = true;
  }

  closeMega(): void {
    this.megaOpen = false;
  }

  toggleCartDropdown(event: Event): void {
    event.preventDefault();
    this.cartDropdownOpen = !this.cartDropdownOpen;
  }

  closeCartDropdown(): void {
    this.cartDropdownOpen = false;
  }

  itemPrice(item: CartItem): number {
    return item.product.priceRange?.min ?? item.product.price;
  }

  incrementCartItem(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrementCartItem(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  removeCartItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
  }

  goToCart(): void {
    this.closeCartDropdown();
    this.router.navigate(['/cart']);
  }

  goToCheckout(): void {
    this.closeCartDropdown();
    this.router.navigate(['/checkout']);
  }

  search(): void {
    const queryParams: { [key: string]: string | null } = {
      search: this.searchTerm || null,
    };
    if (this.selectedCategory !== 'All Categories') {
      queryParams['category'] = this.categoryKeywordMap[this.selectedCategory] || null;
    }
    this.router.navigate(['/shop'], { queryParams });
  }

  openAuthModal(): void {
    this.authModalOpen = true;
  }

  closeAuthModal(): void {
    this.authModalOpen = false;
  }
}