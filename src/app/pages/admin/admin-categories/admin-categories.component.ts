import { Component, OnInit } from '@angular/core';
import { AdminStorageService } from '../../../core/services/admin-storage.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  newName = '';
  editingId: number | null = null;
  editingName = '';
  toastMessage = '';

  constructor(private adminStorage: AdminStorageService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.categories = this.adminStorage.getCategories();
  }

  addCategory(): void {
    const name = this.newName.trim();
    if (!name) return;
    this.adminStorage.saveCategory({ id: 0, name });
    this.newName = '';
    this.load();
    this.showToast('Category added.');
  }

  startEdit(category: Category): void {
    this.editingId = category.id;
    this.editingName = category.name;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingName = '';
  }

  saveEdit(category: Category): void {
    const name = this.editingName.trim();
    if (!name) return;
    this.adminStorage.saveCategory({ ...category, name });
    this.cancelEdit();
    this.load();
    this.showToast('Category updated.');
  }

  deleteCategory(category: Category): void {
    const confirmed = confirm(`Delete category "${category.name}"? Existing products keep their category text.`);
    if (!confirmed) return;
    this.adminStorage.deleteCategory(category.id);
    this.load();
    this.showToast('Category deleted.');
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 2200);
  }
}