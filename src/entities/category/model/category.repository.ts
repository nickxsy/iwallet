import { persistStorage } from '@/shared/lib';

import { Category } from './types';

const CATEGORY_STORAGE_KEY = 'Category_key';

class CategoryRepository {
  async loadCategories(): Promise<Category[]> {
    return persistStorage.getItemSafe<Category[]>(CATEGORY_STORAGE_KEY, []);
  }
  async saveCategory() {}
  async removeCategory(id: string) {}
  async updateCategory() {}
  async getCategoryById() {}
}

export const categoryRepository = new CategoryRepository();
