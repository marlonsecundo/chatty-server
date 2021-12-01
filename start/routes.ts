/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Google Auth
Route.get('/google/redirect', 'Auth/GoogleSessionsController.redirect')
Route.get('/google/callback/', 'Auth/GoogleSessionsController.callback')
Route.get('/google/user', 'Auth/GoogleSessionsController.getUser').middleware('auth')
Route.get('/logout', 'Auth/GoogleSessionsController.logout').middleware('auth')

// Resources
Route.group(() => {
  // POST
  Route.resource('posts', 'PostsController').apiOnly()

  // USER
  Route.get('users/me', 'UsersController.show')
  Route.patch('users/me', 'UsersController.update')
  Route.delete('users/me', 'UsersController.destroy')
}).middleware('auth')
