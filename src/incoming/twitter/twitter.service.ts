import { Injectable, HttpService } from '@nestjs/common';
import { TwitterMentionON5 } from './dto/twitter-incoming.dto';
import { mCustomerON5 } from '../customer.dto';
@Injectable()
export class TwitterService {
  constructor(private http: HttpService) { }

  async webhook(postTwitter) {
    try {
      const host = process.env.ENDPOIN_ON5;

      if (typeof postTwitter.data.tweet_create_events !== 'undefined') {
        const sendToON5 = this.parseMentionWebhook(postTwitter);
        console.log("Parse Result", sendToON5);

        if (sendToON5) {
          const result = await this.http
            .post(`${host}/v1/incoming/twitter`, sendToON5)
            .toPromise();
          return {
            isError: false,
            data: result.data,
            statusCode: 201,
          };
        } else {
          return {
            isError: false,
            data: 'Bukan incoming',
            statusCode: 204,
          };
        }
      }

      if (typeof postTwitter.data.direct_message_events !== 'undefined') {
        const sendToON5 = this.parseMentionWebhook(postTwitter);
        console.log("Parse Result DM", sendToON5);
        if (sendToON5) {
          const result = await this.http
            .post(`${host}/v1/incoming/twitter_dm`, sendToON5)
            .toPromise();
          return {
            isError: false,
            data: result.data,
            statusCode: 201,
          };
        } else {
          return {
            isError: false,
            data: 'Bukan incoming',
            statusCode: 204,
          };
        }
      }

      return {
        isError: false,
        data: 'Bukan incoming',
        statusCode: 204,
      };
    } catch (error) {
      console.error(error);
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }

  parseMentionWebhook(postTwitter) {
    if (
      postTwitter.account == postTwitter.data.tweet_create_events[0].user.id_str
    ) {
      return false;
    } else {
      let sendToON5 = new TwitterMentionON5();
      sendToON5.channel_id = 8;
      sendToON5.from = postTwitter.data.tweet_create_events[0].user.id_str;
      sendToON5.from_name = postTwitter.data.tweet_create_events[0].user.name;
      sendToON5.message = postTwitter.data.tweet_create_events[0].text;
      sendToON5.message_type = 'Mention';
      sendToON5.stream_id = postTwitter.data.tweet_create_events[0].id_str;
      sendToON5.stream_to_id = postTwitter.account;
      sendToON5.tenant_id = postTwitter.tenant;
      sendToON5.date_stream = new Date(postTwitter.data.tweet_create_events[0].created_at);

      //SET MEDIA
      if (typeof postTwitter.data.tweet_create_events[0].extended_entities !== 'undefined') {
        if (typeof postTwitter.data.tweet_create_events[0].extended_entities.media !== 'undefined') {
          const mediaTwitter = postTwitter.data.tweet_create_events[0].extended_entities.media;
          let mediaON5 = [];
          for (let index = 0; index < mediaTwitter.length; index++) {
            const type = mediaTwitter[index].type;
            if (type == 'photo') {
              mediaON5.push(mediaTwitter[index].media_url_https);
            } else if (type == 'animated_gif') {
              mediaON5.push(mediaTwitter[index].video_info.variants[0].url);
            }
          }
          sendToON5.media = JSON.stringify(mediaON5);
        }
      }

      //SET CUST
      sendToON5.custData = new mCustomerON5();
      sendToON5.custData.cust_tw_acc =
        postTwitter.data.tweet_create_events[0].user.screen_name;
      sendToON5.custData.cust_tw_followers =
        postTwitter.data.tweet_create_events[0].user.followers_count;
      sendToON5.custData.cust_tw_following =
        postTwitter.data.tweet_create_events[0].user.friends_count;
      sendToON5.custData.cust_tw_name =
        postTwitter.data.tweet_create_events[0].user.name;
      sendToON5.custData.cust_tw_pic =
        postTwitter.data.tweet_create_events[0].user.profile_image_url_https;

      //SET ADDITIONAL INFO
      sendToON5.additionalInfo = {} 
      sendToON5.additionalInfo['hashtags'] =JSON.stringify(postTwitter.data.tweet_create_events[0].entities.hashtags)
      return sendToON5
    }
  }

  parseDMWebhook(postTwitter) {
    const senderId = postTwitter.data.direct_message_events[0].message_create.sender_id
    if (postTwitter.account == senderId) {
      return false;
    } else {
      let sendToON5 = new TwitterMentionON5();
      sendToON5.channel_id = 13;
      sendToON5.from = postTwitter.data.users[senderId].id;
      sendToON5.from_name = postTwitter.data.users[senderId].name;
      sendToON5.message = postTwitter.data.direct_message_events[0].message_create.message_data.text
      sendToON5.stream_id = postTwitter.data.direct_message_events[0].id;
      sendToON5.stream_to_id = postTwitter.account;
      sendToON5.tenant_id = postTwitter.tenant;
      sendToON5.date_stream = new Date(postTwitter.data.direct_message_events[0].created_timestamp);

      //SET MEDIA
      if (
        typeof postTwitter.data.direct_message_events[0].message_create.message_data.attachment !== 'undefined'
      ) {

        const mediaTwitter =
          postTwitter.data.direct_message_events[0].message_create.message_data.attachment.media
        let mediaON5 = [];
        if (mediaTwitter.type == "photo") {
          sendToON5.message_type = 'image';
          mediaON5.push(mediaTwitter.media_url_https);
        } else if (mediaTwitter.type == "animated_gif") {
          sendToON5.message_type = 'video';
          mediaON5.push(mediaTwitter.video_info.variants[0].url);
        }
        sendToON5.media = JSON.stringify(mediaON5);
      } else {
        sendToON5.message_type = 'text';
      }

      //SET CUST
      sendToON5.custData = new mCustomerON5();
      sendToON5.custData.cust_tw_acc = postTwitter.data.users[senderId].screen_name;
      sendToON5.custData.cust_tw_followers = postTwitter.data.users[senderId].followers_count;
      sendToON5.custData.cust_tw_following = postTwitter.data.users[senderId].friends_count;
      sendToON5.custData.cust_tw_name = postTwitter.data.users[senderId].name;
      sendToON5.custData.cust_tw_pic = postTwitter.data.users[senderId].profile_image_url_https;
      return sendToON5
    }
  }
}
