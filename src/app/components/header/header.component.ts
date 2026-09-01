import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  queryParams?: { [key: string]: string };
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
  isMenuOpen = false;

  searchTerm = '';
  selectedCategory = 'All Categories';
  categories = ['All Categories', 'Bussiness Series Laptop', 'Glossy Series Laptop', 'Graphic Laptop', 'MacBook', 'Accessories', 'Monitors', 'Desktop'];

  private categoryKeywordMap: { [label: string]: string } = {
    'Bussiness Series Laptop': 'Business',
    'Glossy Series Laptop': 'Glossy',
    'Graphic Laptop': 'Graphic',
    MacBook: 'MacBook',
    Accessories: 'Accessories',
    Monitors: 'Monitors',
    Desktop: 'Desktop',
  };

  navLinks: NavItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about-us' },
    {
      label: 'Laptops',
      link: '/shop',
      mega: true,
    },
    { label: 'MacBook', link: '/shop', queryParams: { category: 'MacBook' } },
    { label: 'Accessories', link: '/shop', queryParams: { category: 'Accessories' } },
    { label: 'Monitors', link: '/shop', queryParams: { category: 'Monitors' } },
    { label: 'Desktop', link: '/shop', queryParams: { category: 'Desktop' } },
    { label: 'Wholesale', link: '/wholesale' },
    { label: 'Contact Us', link: '/contact-us' },
  ];

  megaBrands: MegaLink[] = [
    { label: 'HP', queryParams: { brand: 'HP' } },
    { label: 'Dell', queryParams: { brand: 'Dell' } },
    { label: 'Lenovo', queryParams: { brand: 'Lenovo' } },
    { label: 'Toshiba', queryParams: { brand: 'Toshiba' } },
    { label: 'Asus', queryParams: { brand: 'Asus' } },
    { label: 'MSI', queryParams: { brand: 'MSI' } },
    { label: 'Apple', queryParams: { brand: 'Apple' } },
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
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.closeMobileMenu());
  }

  closeAnnouncement(): void {
    this.showAnnouncement = false;
  }

  closeMobileMenu(): void {
    if (window.innerWidth > 991) return;

    this.isMenuOpen = false;
    this.megaOpen = false;
    this.navLinks.forEach((item) => item._mobileOpen = false);
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
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
    this.closeMobileMenu();
  }

  openAuthModal(): void {
    this.authModalOpen = true;
  }

  closeAuthModal(): void {
    this.authModalOpen = false;
  }
}