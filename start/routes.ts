/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
| 
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ArticlesController = () => import('#controllers/articles_controller')
const SessionController = () => import('#controllers/session_controller')

router.get('/articles', [ArticlesController, 'index'])
router.get('/articles/:id', [ArticlesController, 'show'])

router
    .group(()=> {
        router.post('/articles', [ArticlesController, 'store'])
        router.put('/articles/:id', [ArticlesController, 'update'])
        router.delete('/articles/:id', [ArticlesController, 'destroy'])
    })
    .use(middleware.auth({guards: ['api']}))

router.post('/register', [SessionController, 'register'])
router.post('/login', [SessionController, 'login'])
router.delete('/logout', [SessionController, 'logout']).use(middleware.auth({guards: ['api']}))