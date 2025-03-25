import type { HttpContext } from '@adonisjs/core/http'

import Article from '#models/article'

export default class ArticlesController {
    async index() {
        const article = await Article.query().select('id', 'title', 'description')

        return {
        message: 'Success get all article',
        data: article,
        }
    }

    async store({ request }: HttpContext) {
        const data = request.body()

        const newArticle = await Article.create({
        title: data.title,
        description: data.description,
        content: data.content,
        })

        return {
        message: 'Success create article',
        data: newArticle,
        }
    }

    async show({ params }: HttpContext) {
        const id = params.id
        const article = await Article.find(id)
    
        return {
            message: 'Success get detail article',
            data: article,
        }
    }

    async update({ params, request }: HttpContext) {
        const id = params.id
        const data = request.body()
    
        const article = await Article.findOrFail(id)
    
        await article
            .merge({ 
                title: data.title, 
                content: data.content, 
                description: data.description 
            })
            .save()
        
            return {
            message: 'Success update article',
            data: article,
            }
    } 

    async destroy({ params }: HttpContext) {
        const id = params.id
        const article = await Article.findOrFail(id)
        
        await article.delete()
        
        return {
            message: 'Success delete article',
        }
    }
    
}
