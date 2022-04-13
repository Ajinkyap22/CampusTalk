const Notification = require("../models/notification");
const Forum = require("../models/forum");
const User = require("../models/user");

// postRequest and joinRequest notification
exports.requestNotification = async (req, res) => {
  try {
    const { type, forum } = req.body;

    let notification = new Notification({
      type,
      forum,
    });

    await notification.save();

    // send notificatino to all moderators of the forum
    Forum.findById(forum)
      .populate("moderators")
      .exec((err, forum) => {
        if (err) return res.status(500).json({ error: err.message });

        forum.moderators.forEach((moderator) => {
          User.findById(moderator._id)
            .populate("notifications")
            .exec((err, user) => {
              if (err) return res.status(500).json({ error: err.message });

              user.notifications.push(notification);
              user.save();
            });
        });
      });

    Notification.populate(
      notification,
      { path: "forum" },
      (err, newNotification) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json(newNotification);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// comment and reply notification
exports.activityNotfication = async (req, res) => {
  try {
    const { type, from, to, forum, post } = req.body;

    let notification = new Notification({
      type,
      from,
      to,
      forum,
      post,
    });

    await notification.save();

    // send notificatino to the user who commented or replied
    User.findById(to)
      .populate("notifications")
      .exec((err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        user.notifications.push(notification);
        user.save();
      });

    Notification.populate(notification, { path: "from" }, (err, notif) => {
      if (err) return res.status(500).json({ error: err.message });

      Notification.populate(
        notif,
        { path: "forum" },
        (err, newNotification) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json(newNotification);
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// join request approved notification
exports.joinRequestApproved = async (req, res) => {
  try {
    const { forum, to } = req.body;

    let notification = new Notification({
      type: "requestApproved",
      forum,
      to,
    });

    await notification.save();

    // send notificatino to the user who joined the forum
    User.findById(to)
      .populate("notifications")
      .exec((err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        user.notifications.push(notification);
        user.save();
      });

    Notification.populate(
      notification,
      { path: "forum" },
      (err, newNotification) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json(newNotification);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("notifications")
      .exec((err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        Notification.populate(
          user.notifications,
          { path: "from" },
          (err, notifications) => {
            if (err) return res.status(500).json({ error: err.message });

            Notification.populate(
              notifications,
              { path: "forum" },
              (err, newNotifications) => {
                if (err) return res.status(500).json({ error: err.message });

                // sort notifications by timestamp
                newNotifications.sort((a, b) => {
                  return b.timestamp - a.timestamp;
                });

                res.status(201).json(newNotifications);
              }
            );
          }
        );
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    Notification.findById(notificationId, (err, notification) => {
      if (err) return res.status(500).json({ error: err.message });

      // remove notification from user's notifications
      User.findByIdAndUpdate(
        notification.to,
        { $pull: { notifications: notification._id } },
        (err, user) => {
          if (err) return res.status(500).json({ error: err.message });
        }
      );

      // remove notification from forum moderators' notifications
      if (
        notification.type === "postRequest" ||
        notification.type === "joinRequest"
      ) {
        Forum.findById(notification.forum)
          .populate("moderators")
          .exec((err, forum) => {
            if (err) return res.status(500).json({ error: err.message });

            forum.moderators.forEach((moderator) => {
              User.findByIdAndUpdate(
                moderator._id,
                { $pull: { notifications: notification._id } },
                (err, user) => {
                  if (err) return res.status(500).json({ error: err.message });
                }
              );
            });
          });
      }

      res.status(200).json(notification);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// clear all notifications
exports.clearNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    User.findByIdAndUpdate(
      userId,
      { $set: { notifications: [] } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(user);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// mark notification as seen
exports.markAsSeen = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;

    // push user id to notification's seen array
    Notification.findByIdAndUpdate(
      notificationId,
      { $push: { seen: userId } },
      { new: true },
      (err, notification) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(notification);
      }
    );
  } catch {
    res.status(500).json({ error: error.message });
  }
};
