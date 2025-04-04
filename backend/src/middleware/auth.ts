import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.model'

// Add user to Request interface
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Req Middleware: ${req.method} - ${req.baseUrl}`)
    try {

        const tokenLS = req.body.token

        if(!tokenLS) {
            res.status(401).json({success: false, message: 'Unauthorized user, not token'})
            return
        }
    
        // Verify JWT
        const token = jwt.verify(tokenLS, process.env.JWT_SECRET) as jwt.JwtPayload
    
        if(!token) {
            res.status(401).json({success: false, message: 'Unauthorized request, invalid token.'})
            return 
        }
    
        // Look for user
        const user = await User.findByPk(token.id)
        if(!user) {
            res.status(404).json({success: false, message: 'User not found'})
            return
        }
    
        // compare user token with cookies token
        if(user.token !== tokenLS) {
            res.status(401).json({success: false, message: 'Unauthorized request, not access'})
            return
        }

        req.user = user
    
        next()
    } catch (error) {
        console.log('[ERROR_AUTHENTICATEMIDDLEWARE]', error.message)
        res.status(500).json({success: false, message: 'Error verifying user session'})
        return
    }

}

export default authenticate