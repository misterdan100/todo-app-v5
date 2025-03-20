import { Request, Response } from 'express'
import User from '../models/User.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookiesConfig } from '../config/cookiesConfig'


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as {name: string, email: string, password: string}

        if( !name || !email || !password) {
            res.status(500).json({success: false, message: 'Data for new user is missing'})
            return
        }

        // verify is user exists in db
        const userExist = await User.findOne({where: {email: email}})

        if( userExist ) {
            res.status(500).json({success: false, message: 'This e-mail is already registered'})
            return
        }

        // create hash password
        const saltRounds = 10
        const hashedPassword = bcrypt.hashSync(password, saltRounds)

        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        })

        // create and add token to user
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        user.token = token
        const savedUser = await user.save()

        res.cookie('token', token, cookiesConfig)

        res.status(200).json({ success: true, data: savedUser})
        
    } catch (error) {
        console.log('[ERROR_CREATEUSER]', error.message)
        res.status(500).json({success: false, error: true, message: 'Error creating user'})
    }

}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const validtoken = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as jwt.JwtPayload
        if(!validtoken) {
            res.status(401).json({success: false, error: 'Unauthorized request, invalid token.'})
            return 
        }

        const user = await User.findByPk(validtoken.id)
        if(!user) {
            res.status(404).json({success: false, error: 'User not found'})
            return
        }
        const userToReturn = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
        res.status(200).json({success: true, data: userToReturn}) 
        
    } catch (error) {
        console.log('[ERROR_GETUSERBYID]', error.message)
        res.status(500).json({success: false, error: 'Error getting user by id'})
    }
}

export const verifySession = async (req: Request, res: Response) => {
    try {
        // read and verify cookies
        if(!req.cookies.token) {
            res.status(401).json({success: false, message: 'Unauthorized user'})
            return
        }

        // verify jwt
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as jwt.JwtPayload
        if(!token) {
            res.status(401).json({success: false, message: 'Unauthorized request, invalid token.'})
            return 
        }

        // look for user
        const user = await User.findByPk(token.id)
        if(!user) {
            res.status(404).json({success: false, message: 'User not found'})
            return
        }

        //compare user token with cookies token
        if(user.token !== req.cookies.token) {
            res.status(401).json({success: false, message: 'Unauthorized request, not access'})
            return
        }

        res.status(200).json({success: true, data: {id: user.id ,email: user.email, name: user.name}, message: 'User authenticated'})

    } catch (error) {
        console.log('[ERROR_VERIFYSESSION]', error.message)
        res.status(500).json({success: false, message: 'Error verifying user session'})
        return
    }
}

export const logingUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        // Validate email and password are not empty
        if(!email || !password) {
            res.status(401).json({success: false, message: 'Email or password is missing.'})
            return
        }

        // Validate user exists
        const user = await User.findOne({where: {email}})

        if(!user) {
            res.status(404).json({success: false, message: 'User not found.'})
            return
        }

        // Validate password
        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid) {
            res.status(401).json({success: false, message: 'Invalid password.'})
            return
        }

        // create and save new session token
        const newToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        user.token = newToken
        await user.save()

        // set token in cookies
        res.cookie('token', newToken, cookiesConfig)

        res.status(200).json({success: true})
        
    } catch (error) {
        console.log('[ERROR_LOGINUSER]', error.message)
        res.status(500).json({success: false, message: 'Error loging user'})
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        // read and verify cookies
        if(!req.cookies.token) {
            res.status(401).json({success: false, message: 'Unauthorized user'})
            return
        }

        // verify jwt
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as jwt.JwtPayload
        if(!token) {
            res.status(401).json({success: false, message: 'Unauthorized request, invalid token.'})
            return 
        }

        // look for user
        const user = await User.findByPk(token.id)
        if(!user) {
            res.status(404).json({success: false, message: 'User not found'})
            return
        }

        //compare user token with cookies token
        if(user.token !== req.cookies.token) {
            res.status(401).json({success: false, message: 'Unauthorized request, not access'})
            return
        }

        user.token = null
        await user.save()

        res.clearCookie('token')
        res.clearCookie('session')

        res.status(200).json({success: true})

    } catch (error) {
        console.log('[ERROR_LOGINUSER]', error.message)
        res.status(500).json({success: false, message: 'Error loging user'})  
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        
        if( !req.body.name && !req.body.email && !req.body.password) {
            res.status(400).json({success: false, error: 'Data to update is missing'})
            return
        }
        const { name, email, password,  } = req.body
        
        const userId = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as jwt.JwtPayload
        if(!userId) {
            res.status(401).json({success: false, error: 'Unauthorized request, invalid token.'})
            return
        }

        // search user in db
        const user = await User.findByPk(userId.id)
        if(!user) {
            res.status(401).json({success: false, error: 'Email is already registered.'})
            return
        }

        if(email && email.toLowerCase().trim() !== user.email) {
            // verify if email exists
            const emailExists = await User.findOne({where: {email}})
            if(emailExists) {
                res.status(401).json({success: false, error: 'Email is already registered.'})
                return
            }

            // if newEmail doesn't exist in db set new email to user
            user.email = email.toLowerCase()
        }

        // hash new password
        if(password) {
            const hashedPassword = await bcrypt.hash(password.trim(), 10)
            user.password = hashedPassword
        }

        if( name ) {
            user.name = name.trim()
        }

        await user.save()

        res.status(200).json({success: true, data: user})
        
    } catch (error) {
        console.log('[ERROR_UPDATEPROFILE]', error.message)
        res.status(500).json({success: false, error: 'Error updating profile'})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as jwt.JwtPayload
        if(!token) {
            res.status(401).json({success: false, error: 'Unauthorized request, invalid token.'})
            return
        }

        const user = await User.findByPk(token.id)
        if( !user ) {
            res.status(404).json({success: false, error: 'User not found.'})
            return
        }
        //Todo: delete tasks and projects related to user

        await user.destroy()
        res.clearCookie('token')
        res.status(200).json({success: true, message: 'User deleled.'})
        
    } catch (error) {
        console.log('[ERROR_DELETEUSER]', error.message)
        res.status(500).json({success: false, error: 'Error deleting user.'})
    }
}