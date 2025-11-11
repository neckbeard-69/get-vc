<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('profile.edit', absolute: false))->assertRedirect(route('login'));
});

test('authenticated users can visit the profile settings page', function () {
    $this->actingAs(User::factory()->create());

    $this->get(route('profile.edit', absolute: false))->assertOk();
});
