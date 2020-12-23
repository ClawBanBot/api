import { HelixUser } from "twitch/lib";
import Ban from "../data/Ban";
import User, { IUser } from "../data/User";
import Moderator from "../moderator";
import { Channel } from "./Channel";

export class Bot {
  channels: Channel[] = [];
  moderator: Moderator;

  constructor() {
    this.addExistingUsers();
    this.moderator = new Moderator();
  }

  async addExistingUsers() {
    const users = await User.find().exec();
    for (const user of users) {
      await this.addUser(user);
    }
  }

  async addUser(user: IUser) {
    // If we're re-adding the user, disconnect the current connection first
    const existing_channel = this.channels.find(
      (chan) => user.twitch_id === chan.getChannelId()
    );
    if (existing_channel) {
      await existing_channel.close();
    }

    const channel = new Channel(user, this.moderator);
    await channel.authenticate();
    channel.on(
      "new_ban",
      (ban_details: { user: HelixUser; channel: string; reason: string }) =>
        this.add_ban(ban_details.user, ban_details.channel, ban_details.reason)
    );
    await channel.loadBanList();
    await channel.connect();
    this.channels.push(channel);

    // TODO: Apply existing bans to the new channel
    const bans = await Ban.find().exec();
    bans.forEach((existing_ban) => {
      channel.addBanById(existing_ban.twitch_id, existing_ban.reason);
    });
  }

  async add_ban(
    user: HelixUser,
    channel: string,
    reason: string,
    expires_at: string = "3000-01-01T00:00:00"
  ) {
    console.log(
      `Detected ban for ${user.displayName} from ${channel} because of ${reason}`
    );

    // Check if we already have a ban for this user
    const existing_ban = await Ban.findOne({ twitch_id: user.id }).exec();
    if (existing_ban) {
      console.log(`Ban for ${user.displayName} already detected`);
      return;
    }

    console.log(
      `Applying ban for ${user.displayName} from ${channel} because of ${reason}`
    );
    // Save the ban to the database
    await Ban.updateOne(
      { twitch_id: user.id },
      {
        $set: {
          twitch_id: user.id,
          twitch_name: user.name,
          channel,
          reason,
          expires_at,
        },
      },
      { upsert: true }
    ).exec();

    // Propogate the ban across the other channels
    this.channels.forEach((chan) => {
      if (chan.getChannelName() !== channel) {
        chan.addBan(user, reason);
      }
    });
  }
}
