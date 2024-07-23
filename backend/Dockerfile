# Utiliza a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instala extensões necessárias do PHP
RUN docker-php-ext-install pdo pdo_mysql

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos da aplicação
COPY . .

# Instala as dependências do Composer
RUN composer install

# Copia o arquivo de configuração do Apache
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# Habilita o mod_rewrite do Apache
RUN a2enmod rewrite

# Permissões da pasta de storage e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expõe a porta 80
EXPOSE 80

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
