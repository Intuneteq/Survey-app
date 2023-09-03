set -e
echo "Deploying application"

#Enter maintenance mode

(php artisan down --message 'The website is been quickly updated. Please tey again in minutes.') || true
  #update codebase
  git pull origin main

#exit maintainance mode
composer2 install

composer2 dump-autoload
php artisan optimize
php artisan up
php artisan migrate --force

echo "Website deployed"
