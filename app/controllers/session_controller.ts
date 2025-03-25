import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
    async login({ request }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user, ['*'], { expiresIn: '3 days' })

        return {
        message: 'success login',
        data: {
            access_token: token.value?.release(),
        },
        }
    }

    async register({ request }: HttpContext) {
        const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

        const user = await User.create({
        fullName: fullName,
        email: email,
        password: password,
        })

        console.log(user)

        return {
        message: 'success register',
        }
    }

    async logout({ auth }: HttpContext) {
        const user = auth.getUserOrFail()

        await User.accessTokens.delete(user, user.currentAccessToken.identifier)

        return {
        message: 'success logout',
        }
    }
}
