"use server"

import { categoryService } from "../services/category.services";

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