'use strict'

const test = require('ava')
const platzigram = require('../')
const fixtures = require('./fixtures')
const nock = require('nock')

test.beforeEach(t => {
  t.context.client = platzigram.createClient(options)
})

let options = {
  endpoints: {
    pictures: 'http://platzigram.test/picture',
    users: 'http://platzigram.test/user',
    auth: 'http://platzigram.test/auth'
  }
}

test('client', t => {
  const client = t.context.client

  t.is(typeof client.getPicture, 'function')
  t.is(typeof client.savePicture, 'function')
  t.is(typeof client.likePicture, 'function')
  t.is(typeof client.listPictures, 'function')
  t.is(typeof client.listPicturesByTag, 'function')
  t.is(typeof client.saveUser, 'function')
  t.is(typeof client.getUser, 'function')
  t.is(typeof client.auth, 'function')
})

test('getPicture', async t => {
  const client = t.context.client

  let image = fixtures.getPicture()

  nock(options.endpoints.pictures)
    .get(`/${image.publicId}`)
    .reply(200, image)

  let result = await client.getPicture(image.publicId)

  t.deepEqual(image, result)
})

test('savePicture', async t => {
  const client = t.context.client

  let token = 'xxx-xxx-xxx'
  let image = fixtures.getPicture()

  let newImage = {
    src: image.src,
    description: image.description
  }

  nock(options.endpoints.pictures, {
    reqheaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/', newImage)
    .reply(201, image)

  let result = await client.savePicture(newImage, token)

  t.deepEqual(result, image)
})
