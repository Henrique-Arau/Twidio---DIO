import { Request, Response } from 'express'
import { SavePostService } from '../services/SavePostService'

export class SavePostController {
  async handle (request: Request, response: Response): Promise<Response> {
    console.log(request.body)
    const { author, content } = request.body

    if (content.length === 0) {
      return response.status(400).json({
        error: 'Content not by empty'
      })
    }

    const savePostservice = new SavePostService({ author, content })

    const newPost = await savePostservice.execute()

    return response.status(201).json(newPost)
  }
}
