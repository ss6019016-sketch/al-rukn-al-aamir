import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStorageService } from '../../../core/services/admin-storage.service';
import { Category } from '../../../core/models/category.model';
import { Product } from '../../../core/models/product.model';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x600/0b1f4d/ffffff?text=No+Image';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
})
export class AdminProductFormComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  images: string[] = [];
  tags: string[] = [];
  tagInput = '';
  newCategoryName = '';
  addingCategory = false;
  dragOver = false;
  uploading = false;
  submitting = false;
  toastMessage = '';
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private adminStorage: AdminStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories = this.adminStorage.getCategories();

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: [this.categories[0]?.name || '', Validators.required],
      brand: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      oldPrice: [null],
      sku: [''],
      description: [''],
      inStock: [true],
      featured: [false],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      const existing = this.adminStorage.getProductById(this.editingId);
      if (existing) {
        this.form.patchValue({
          name: existing.name,
          category: existing.category,
          brand: existing.brand,
          price: existing.price,
          oldPrice: existing.oldPrice ?? null,
          sku: existing.sku || '',
          description: existing.description || '',
          inStock: existing.inStock !== false,
          featured: !!existing.featured,
        });
        this.images = existing.images?.length ? [...existing.images] : (existing.image ? [existing.image] : []);
        this.tags = existing.tags ? [...existing.tags] : [];
      } else {
        this.editingId = null;
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  // ---------------- Category ----------------

  toggleAddCategory(): void {
    this.addingCategory = !this.addingCategory;
    this.newCategoryName = '';
  }

  saveNewCategory(): void {
    const name = this.newCategoryName.trim();
    if (!name) return;
    const saved = this.adminStorage.saveCategory({ id: 0, name });
    this.categories = this.adminStorage.getCategories();
    this.form.patchValue({ category: saved.name });
    this.addingCategory = false;
    this.newCategoryName = '';
  }

  // ---------------- Tags ----------------

  addTagFromInput(): void {
    const raw = this.tagInput;
    const parts = raw.split(',').map((part) => part.trim()).filter(Boolean);
    for (const part of parts) {
      if (!this.tags.some((tag) => tag.toLowerCase() === part.toLowerCase())) {
        this.tags.push(part);
      }
    }
    this.tagInput = '';
  }

  onTagKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTagFromInput();
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((item) => item !== tag);
  }

  // ---------------- Images ----------------

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFiles(input.files);
      input.value = '';
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files?.length) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  private async handleFiles(fileList: FileList): Promise<void> {
    const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    if (!files.length) return;
    this.uploading = true;
    try {
      for (const file of files) {
        const dataUrl = await this.adminStorage.fileToCompressedDataUrl(file);
        this.images.push(dataUrl);
      }
    } catch (err) {
      alert('One of the images could not be processed. Please try a different file.');
    } finally {
      this.uploading = false;
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  setCoverImage(index: number): void {
    if (index === 0) return;
    const [chosen] = this.images.splice(index, 1);
    this.images.unshift(chosen);
  }

  // ---------------- Submit ----------------

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const value = this.form.value;
    const product: Product = {
      id: this.editingId || 0,
      name: value.name.trim(),
      category: value.category,
      brand: value.brand.trim(),
      price: Number(value.price),
      oldPrice: value.oldPrice ? Number(value.oldPrice) : undefined,
      sku: value.sku?.trim() || undefined,
      description: value.description?.trim() || undefined,
      inStock: !!value.inStock,
      featured: !!value.featured,
      image: this.images[0] || PLACEHOLDER_IMAGE,
      images: this.images.length ? this.images : [PLACEHOLDER_IMAGE],
      tags: this.tags.length ? this.tags : undefined,
      rating: this.editingId ? this.adminStorage.getProductById(this.editingId)?.rating || 0 : 0,
      reviewCount: this.editingId ? this.adminStorage.getProductById(this.editingId)?.reviewCount || 0 : 0,
      reviews: this.editingId ? this.adminStorage.getProductById(this.editingId)?.reviews || [] : [],
    };

    try {
      this.adminStorage.saveProduct(product);
      this.router.navigate(['/admin/products']);
    } catch (err) {
      this.submitting = false;
      alert('Could not save — the browser storage might be full. Try removing an image or two and save again.');
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}