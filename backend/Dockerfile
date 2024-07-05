# Etapa de build
FROM composer:2 as build

WORKDIR /app

COPY . .

RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload --optimize

# Etapa de produção
FROM php:8.2-fpm

WORKDIR /var/www

COPY --from=build /app /var/www

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo_mysql

COPY . /var/www

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

CMD php artisan serve --host=0.0.0.0 --port=8000

EXPOSE 8000
