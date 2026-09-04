import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

interface MarketplaceCard {
  title: string;
  text: string;
  image: string;
  ctaLabel: string;
  action: 'sell' | 'buy';
}

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css'],
})
export class WholesaleComponent implements OnInit {
  heroSlides = [
    {
      heading: 'Wholesale Laptops — Buy & Sell in Bulk with Confidence',
      image: '/assets/img/laptop.png',
    },
    {
      heading: 'Verified Stock, Transparent Pricing, Global Reach',
      image: '/assets/img/laptop.png',
    },
  ];
  activeHeroSlide = 0;

  marketplaceCards: MarketplaceCard[] = [
    {
      title: 'Global Laptop Buying',
      text: 'Purchase high-quality renewed laptops in bulk from trusted suppliers worldwide.',
      image: '/assets/img/laptop.png',
      ctaLabel: 'Want To Sell',
      action: 'sell',
    },
    {
      title: 'Wholesale Stock Selling',
      text: 'Move large-volume laptop inventory quickly through trusted global wholesale channels.',
      image: '/assets/img/laptop.png',
      ctaLabel: 'Want To Buy',
      action: 'buy',
    },
  ];

  bestSellers: Product[] = [];
  tags: string[] = ['13 Inch laptop', '8GB RAM', 'Business Series', 'Core i5', 'Dell Latitude Series', 'Dell Precision'];

  // Sell / Buy modal state
  sellModalOpen = false;
  buyModalOpen = false;
  modalClosing = false;

  // Get Inquiry form
  inquiryFirstName = '';
  inquiryLastName = '';
  inquiryEmail = '';
  inquiryMessage = '';
  inquirySubmitted = false;

  // Sell/Buy modal form
  formName = '';
  formPhone = '';
  formEmail = '';
  formQuantity = '';
  formNotes = '';
  formSubmitted = false;

  inquiryPhone = '';
inquiryTopic = 'general';
inquiryConsent = false;
inquiryFiles: File[] = [];

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bestSellers = this.productService.getBestSellers();
    this.startAutoplay();

    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'sell') {
        this.openSellModal();
      } else if (params['action'] === 'buy') {
        this.openBuyModal();
      }
    });
  }

  setHeroSlide(i: number): void {
    this.activeHeroSlide = i;
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => {
      this.activeHeroSlide = (this.activeHeroSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  openSellModal(): void {
    this.formSubmitted = false;
    this.modalClosing = false;
    this.sellModalOpen = true;
  }

  onInquiryFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.inquiryFiles = Array.from(input.files);
  }
}

  openBuyModal(): void {
    this.formSubmitted = false;
    this.modalClosing = false;
    this.buyModalOpen = true;
  }

  closeModal(): void {
    this.modalClosing = true;
    setTimeout(() => {
      this.sellModalOpen = false;
      this.buyModalOpen = false;
      this.modalClosing = false;
      this.formName = '';
      this.formPhone = '';
      this.formEmail = '';
      this.formQuantity = '';
      this.formNotes = '';
    }, 250);
  }

  submitModalForm(): void {
    // Backend pending — dummy submit, sirf success state dikhata hai
    this.formSubmitted = true;
  }

  submitInquiry(): void {
    // Backend pending — dummy submit
    this.inquirySubmitted = true;
    this.inquiryFirstName = '';
    this.inquiryLastName = '';
    this.inquiryEmail = '';
    this.inquiryMessage = '';
    setTimeout(() => (this.inquirySubmitted = false), 4000);
  }
}