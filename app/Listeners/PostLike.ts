import { EventsList } from '@ioc:Adonis/Core/Event'
import { messaging } from 'firebase-admin'
import { Message } from 'firebase-admin/lib/messaging/messaging-api'

export default class PostLike {
  public async onNewPostLike(eventData: EventsList['new:postLike']) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))

    const fcmToken = eventData.userPostOwner.fcmToken
    const { userWhoLiked, post, likesCount } = eventData

    if (!fcmToken || fcmToken === '') return

    const fcmMessage: Message = {
      data: {
        title: `Your post has ${likesCount} likes`,
        body: `The ${userWhoLiked.username} liked your post`,
        postId: post.id,
        itype: 'new:postLike',
      },

      token: fcmToken,
    }

    await delay(5000)

    await messaging().send(fcmMessage)
  }
}
