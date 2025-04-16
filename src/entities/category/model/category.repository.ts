class CategoryRepository {
  async loadCategories() {
    return [];
  }
  async addCategory() {}
  async removeCategory() {}
  async updateCategory() {}
  async getCategoryById() {}
}

export const categoryRepository = new CategoryRepository();
