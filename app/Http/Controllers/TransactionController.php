<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;

class TransactionController extends Controller
{
    public function getTransaction(Request $request)
    {
        // Number of records per page (default to 10 if not provided)
        $perPage = $request->input('per_page', 10);

        // Fetch transactions with related client and prestataire data, paginated
        $transactions = History::with('client', 'prestataire')->paginate($perPage);

        if ($transactions->total() > 0) {
            return response()->json([
                "transactions" => $transactions->items(), // Current page records
                "currentPage" => $transactions->currentPage(),
                "totalPages" => $transactions->lastPage(),
                "totalItems" => $transactions->total(),
                "perPage" => $transactions->perPage()
            ]);
        }

        return response()->json(["message" => "No transactions found"], 404);
    }


  // app/Http/Controllers/TransactionController.php
public function DeleteTransaction($id)
{
    $transaction = History::find($id);
    if ($transaction) {
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully']);
    }

    return response()->json(['message' => 'Transaction not found'], 404);
}


}
