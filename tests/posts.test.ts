import axios from 'axios'
import { createConnection } from 'typeorm'

const server = axios.create({
  baseURL: 'http://localhost:5001/v1'
})

describe('/posts', () => {
  jest.setTimeout(5000)
  it('Should return status 200 and list of posts', async () => {
    const expectedResponse = [
      {
        post_id: 'b0f3d72a-b8a9-45ec-a8f0-a14f65f3597d',
        author: 'some@email.dio',
        content: 'Some tuit about that'
      },
      {
        post_id: '11f8ad35-c86c-49dc-9c8b-ef31cb1e758f',
        author: 'user@dio.me',
        content: 'User about DIO'
      }
    ]

    const response = await server.get('/posts')
    expect(response.status).toBe(200)
    expect(response.data).toMatchObject(expectedResponse)
  })

  it('should return status 200 post saved', async () => {
    const response = await server.post('/post', {
      author: 'user@dio.me',
      content: 'Algum conteudo da livre'

    })

    const connection = createConnection()
    await (await connection).query(`DELETE FROM posts WHERE post-ID = ${response.data.post_id}`)
    await (await connection).close()

    expect(response.status).toBe(201)
    expect(response.data).toMatchObject({
      author: 'user@dio.me',
      content: 'Algum conteudo da livre'
    })
  })
})
