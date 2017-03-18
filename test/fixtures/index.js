'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getPicture () {
    let id = uuid.uuid()
    return {
      description: 'an #awesome picture with #tags #platzi',
      tags: [ 'awesome', 'tags', 'platzi' ],
      url: `https://platigram.test/${uuid.v4()}.jpg`,
      likes: 0,
      userId: uuid.uuid(),
      publicId: uuid.encode(id),
      id: id,
      createAt: new Date().toString()
    }
  },

  getImages (n) {
    let images = []
    while (n-- > 0) {
      images.push(this.getPicture())
    }

    return images
  },

  getUser () {
    return {
      id: uuid.uuid(),
      name: 'A random user',
      username: 'platzigram',
      createAt: new Date().toString()
    }
  }
}

module.exports = fixtures
