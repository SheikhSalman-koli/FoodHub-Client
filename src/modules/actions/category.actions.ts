"use server"

import { revalidatePath } from "next/cache";
import { CategoryData, categoryService } from "../services/category.services";


// this is for only available gategories, 
export async function getAllCategories() {
    try {
        const categories = await categoryService.getCategories();
        return {
            success: true,
            data: categories,
            message: "Categories fetched successfully"
        };
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Something went wrong while fetching categories";

        return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}

export async function updateCategory(id: string, updatedData: Partial<CategoryData>) {
    try {
        const categories = await categoryService.updateCategories(id, updatedData)
        revalidatePath('/admin/manage-categories')

        return {
            success: true,
            data: categories,
            message: "Categories updated successfully"
        };
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Something went wrong while updating categories";

        return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}


export async function createCategory(newCategory: Partial<CategoryData>) {
    try {
        const categories = await categoryService.createCategory(newCategory)
        revalidatePath('/admin/manage-categories')
        return {
            success: true,
            data: categories,
            message: "Categories created successfully"
        };
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Something went wrong while creating categories";

        return {
            success: false,
            data: [],
            message: errorMessage
        };
    }
}