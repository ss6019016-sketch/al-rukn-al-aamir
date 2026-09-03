import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      title: '5 Signs Your Refurbished Laptop Is Worth It',
      image: 'assets/images/blog/blog-1.svg',
      date: '2026-07-10',
      excerpt: 'Refurbished laptops offer great value — here is what to check before you buy.',
      content: 'Full article content goes here...',
    },
    {
      id: 2,
      title: 'Wholesale Buying Guide for Bulk Laptop Orders',
      image: 'assets/images/blog/blog-2.svg',
      date: '2026-06-22',
      excerpt: 'Everything businesses need to know before placing a bulk laptop order.',
      content: 'Full article content goes here...',
    },
    {
      id: 3,
      title: 'How We Test and Grade Every Laptop',
      image: 'assets/images/blog/blog-3.svg',
      date: '2026-05-15',
      excerpt: 'A look inside our quality assurance process for every device we sell.',
      content: 'Full article content goes here...',
    },
  ];

  getAll(): BlogPost[] {
    return this.posts;
  }

  getById(id: number): BlogPost | undefined {
    return this.posts.find((p) => p.id === id);
  }
}