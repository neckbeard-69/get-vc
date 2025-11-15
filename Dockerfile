FROM php:8.4-cli

# Install system deps
RUN apt-get update && apt-get install -y \
    curl unzip git sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Node + pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && corepack enable \
    && corepack prepare pnpm@latest --activate

# App dir
WORKDIR /var/www
COPY . .

RUN mkdir -p bootstrap/cache \
    && mkdir -p storage \
    && chmod -R 777 bootstrap/cache storage

RUN composer install
RUN pnpm install

EXPOSE 8000 5173


CMD ["bash", "-lc", "pnpm run dev --host --port=5173 & php artisan serve --host=0.0.0.0 --port=8000"]
