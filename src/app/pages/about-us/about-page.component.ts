import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface PromoBanner {
  tag: string;
  title: string;
  price: string;
  image: string;
}

interface AboutTestimonial {
  name: string;
  role: string;
  rating: number;
  message: string;
}

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent {
  heroImage = '/assets/img/laptop.png';

  storyIntro = 'Al Rukn Al Aamir Computers';

  storyParagraphs: string[] = [
    'Our journey began in 2002 under the name Alhamd Traders, where we started by selling Pentium 1 PCs and CRT monitors. From these humble beginnings, we have grown into a trusted name in the global used computer industry.',

    "In 2020, we proudly expanded into Sharjah, UAE — home to the world's largest used computer market — where customers from across the globe come to find quality, affordable technology. Here, we specialize in wholesale refurbishing laptops imported from the USA and other economically stable countries, ensuring they are carefully restored and ready for reliable reuse.",

    'Our mission is simple: to make dependable technology accessible to all. We see this not just as a business, but as a service — helping students, families, and professionals who cannot afford expensive new devices, while actively contributing to a more sustainable, eco-friendly future.',

    'At Al Rukn Al Aamir Computers, we believe that quality technology should be within reach of everyone, not just a privileged few. By extending the life of used laptops, we reduce electronic waste and promote responsible, green practices.',

    'From humble beginnings to an international presence, our story continues — driven by purpose, powered by people. Honest business, reliable products, and long-term customer relationships remain the heart of everything we do.',
  ];

  howHeading = 'How we became best among others?';

  howText =
    "At Al Rukn Al Aamir Computers, we've earned our reputation through two decades of honest business, expert refurbishing, and customer-first service. By offering affordable, high-quality laptops and reducing electronic waste, we make technology accessible to everyone. Our commitment to quality, trust, and sustainability sets us apart in the industry.";

  galleryImages: string[] = [
    '/assets/img/laptop.png',
    '/assets/img/laptop.png',
  ];

  teamIntro =
    'Al Quwah is supported by a highly professional and experienced management team dedicated to operational excellence and customer satisfaction. Each department, from sales and technical support to logistics and administration, functions cohesively under strong leadership to ensure streamlined processes and consistent service quality. With a focus on strategic oversight and efficient coordination across all branches, our management team upholds the highest standards of performance, reliability, and integrity.';

  teamMembers: TeamMember[] = [
    {
      name: 'Hammad Sheikh',
      role: 'CEO Manager',
      phone: '+971 527251545',
      email: 'hammad@alruknalammircomputer.com',
    },
    {
      name: 'Yasir Rasheed',
      role: 'Remarketing Manager',
      phone: '+971 527485182',
      email: 'yaisr@alruknalammircomputer.com',
    },
    {
      name: 'Adnan Sheikh',
      role: 'Operations Manager',
      phone: '+971 526511946',
      email: 'adnan@alruknalammircomputer.com',
    },
    {
      name: 'Sara Khalid',
      role: 'Customer Support Lead',
      phone: '+971 521234567',
      email: 'sara@alruknalammircomputer.com',
    },
  ];

  teamPerSlide = 2;
  activeTeamSlide = 0;

  get teamSlides(): TeamMember[][] {
    const slides: TeamMember[][] = [];

    for (
      let i = 0;
      i < this.teamMembers.length;
      i += this.teamPerSlide
    ) {
      slides.push(
        this.teamMembers.slice(i, i + this.teamPerSlide)
      );
    }

    return slides;
  }

  nextTeamSlide(): void {
    if (this.teamSlides.length === 0) {
      return;
    }

    this.activeTeamSlide =
      (this.activeTeamSlide + 1) % this.teamSlides.length;
  }

  prevTeamSlide(): void {
    if (this.teamSlides.length === 0) {
      return;
    }

    this.activeTeamSlide =
      (this.activeTeamSlide - 1 + this.teamSlides.length) %
      this.teamSlides.length;
  }

  setTeamSlide(i: number): void {
    this.activeTeamSlide = i;
  }

  promoBanners: PromoBanner[] = [
    {
      tag: 'DELL 2-IN-1 SERIES',
      title: 'Dell Professional Range',
      price: 'PKR 499',
      image: '/assets/img/laptop.png',
    },
    {
      tag: 'HP SERIES',
      title: 'HP Essential Series',
      price: 'PKR 499',
      image: '/assets/img/laptop.png',
    },
  ];

  facilitiesHeading =
    'We Can Provide Best Facilities For Business.';

  facilitiesText =
    'At Al Rukn Al Aamir Computer, we combine quality, affordability, and eco-conscious practices to provide the best refurbished tech solutions for individuals, businesses, and global partners. Join us in making technology accessible and sustainable for everyone.';

  testimonials: AboutTestimonial[] = [
    {
      name: 'Jonas White',
      role: 'Designer',
      rating: 5,
      message:
        "My laptop works wonderfully! I like the look of it, the silver is very nice. It's lightweight and I love that it has the numeric keypad.",
    },
    {
      name: 'Amina Yousuf',
      role: 'Marketing Lead',
      rating: 5,
      message:
        'Fantastic laptop for the money. Everything is so quick and the pictures are so clear. Great customer service too.',
    },
    {
      name: 'Farhan Malik',
      role: 'Software Engineer',
      rating: 4,
      message:
        'Lightweight, reliable, and great value. Delivery was fast and the laptop was exactly as described.',
    },
  ];

  activeTestimonial = 0;

  get stars(): number[] {
    return Array(5).fill(0);
  }

  setTestimonial(i: number): void {
    this.activeTestimonial = i;
  }
}