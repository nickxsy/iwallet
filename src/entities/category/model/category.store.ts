import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { registerSlice } from '@/shared/lib';

import { categoryRepository } from './category.repository';
import { Category } from './types';

export type CategoryStore = {
  categories: Category[];
};

const initialState: CategoryStore = {
  categories: []
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(loadCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  }
});

registerSlice([categoriesSlice]);

const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    const categories = await categoryRepository.loadCategories();
    return categories;
  }
);

export const categoriesStore = {
  actions: {},
  selectors: {}
};
