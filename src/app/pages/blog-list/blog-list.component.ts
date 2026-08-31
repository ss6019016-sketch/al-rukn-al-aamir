import { Component } from '@angular/core';
import { BlogPost } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent {
  posts: BlogPost[] = this.blogService.getAll();

  constructor(private blogService: BlogService) {}
}