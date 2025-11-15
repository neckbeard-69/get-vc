<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class RepositoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Repositories/Index', [
            'repos' => Repository::where('user_id', Auth::id())->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Repository::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
    'slug' => Auth::user()->username . '/' . strtolower(str_replace(' ', '-', $request->name)),
            'description' => $request->description,
            'private' => $request->private,
        ]);

        return redirect()->back();
    }
    public function edit(Repository $repository): Response {
        return Inertia::render('Repositories/Edit', [
            'repo' => $repository,
        ]);
    }

    public function update(Request $request, Repository $repository): RedirectResponse {
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'private' => 'boolean',
    ]);

    $repository->update($request->all());
    return redirect()->route('repositories.index');
    }

    public function destroy(Repository $repository): RedirectResponse
    {
        if ($repository->user_id !== Auth::id()) {
            abort(403);
        }

        $repository->delete();

        return redirect()->route('repositories.index');
    }

}
