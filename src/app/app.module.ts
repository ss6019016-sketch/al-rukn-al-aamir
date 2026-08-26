import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { DealOfDayComponent } from './components/deal-of-day/deal-of-day.component';
import { LimitedStockComponent } from './components/limited-stock/limited-stock.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { WholesaleComponent } from './components/wholesale/wholesale.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';

import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutPageComponent } from './pages/about-us/about-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { RippleDirective } from './shared/components/directives/ripple.directive';
import { ScrollRevealDirective } from './shared/components/directives/scroll-reveal.directive';
import { AppendToBodyDirective } from './shared/components/directives/append-to-body.directive';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'about-us', component: AboutPageComponent },
  { path: 'wholesale', component: WholesaleComponent }, 
  { path: 'contact-us', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroBannerComponent,
    DealOfDayComponent,
    LimitedStockComponent,
    BestSellersComponent,
    WholesaleComponent,
    CategoryBannerComponent,
    NewArrivalsComponent,
    TestimonialsComponent,
    FooterComponent,
    ProductCardComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailComponent,
    AboutPageComponent,
    ContactComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent,
    AvatarComponent,
    RippleDirective,
    ScrollRevealDirective,
    AppendToBodyDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}