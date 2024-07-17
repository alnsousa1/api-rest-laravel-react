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
