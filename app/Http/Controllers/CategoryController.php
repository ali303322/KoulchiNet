<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    public function index(){

        $services = Services::all();
        return response()->json($services);
    }

    public function Categories(){
        $categories = Category::all();
        return response()->json($categories);
    }


    public function CategoriesWithPagenate(){
        $categories = Category::paginate(5);
        return response()->json([
            'data' => $categories->items(), // Categories data for the current page
            'total_pages' => $categories->lastPage(), // Total number of pages
            'current_page' => $categories->currentPage(), // Current page
            'per_page' => $categories->perPage(), // Items per page
        ]);
    }

    public function categorieService($id)
    {
        $services = Services::where('category_id', $id)
            ->paginate(5); // Limit to 5 items per page

        // Return the paginated result
        return response()->json([
            'data' => $services->items(),
            'total_pages' => $services->lastPage(), // Total number of pages
            'current_page' => $services->currentPage(), // Current page number
            'per_page' => $services->perPage(), // Items per page
        ]);
    }

    public function AddCategorie(Request $request)
{
    // Validate the incoming request
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'icon' => 'required|file|mimes:jpg,jpeg,png,svg|max:99999', // Added max size
    ]);

    try {
        // Handle file upload
        if ($request->hasFile('icon')) {
            // Get the file from the request
            $file = $request->file('icon');

            // Define the destination path in the public/icons folder
            $destinationPath = public_path('icons'); // public/icons

            // Make sure the 'icons' directory exists
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0777, true); // Create directory if it doesn't exist
            }

            // Generate a unique file name
            $fileName = time() . '-' . $file->getClientOriginalName();

            // Move the file to the public/icons directory
            $file->move($destinationPath, $fileName);

            // Generate the accessible URL
            $iconUrl = 'icons/' . $fileName; // Accessible URL
        }

        $category = Category::create([
            'nom' => $validatedData['name'],
            'icon' => $iconUrl,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category added successfully.',
            'url'=>$iconUrl,
            'category' => $category,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to add category. Please try again.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



public function supprimerCategorie($id)
{
    try {
        // Find the category by ID, or return a 404 response if not found
        $category = Category::findOrFail($id);

        // Delete the category
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès.'], 200);
    } catch (\Exception $e) {
        // Log the error for debugging
        \Log::error('Erreur lors de la suppression de la catégorie', ['message' => $e->getMessage(), 'trace' => $e->getTrace()]);

        return response()->json(['error' => 'Erreur lors de la suppression de la catégorie.'], 500);
    }
}



}
