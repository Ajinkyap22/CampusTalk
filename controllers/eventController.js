const Event = require("../models/event");
const Forum = require("../models/forum");
const User = require("../models/user");

// create event
exports.createEvent = async (req, res, next) => {
  try {
    const { name, description, link, forum, time, date, venue } = req.body;

    let event = new Event({
      name,
      description,
      link,
      time,
      forum,
      date,
      venue,
    });

    await event.save();

    Event.populate(event, { path: "forum" }, (err, newEvent) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json(newEvent);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// upload event image
exports.uploadEventImages = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const images = [];

    if (req.files?.length) {
      req.files.forEach((file) => {
        images.push(file.filename);
      });
    }

    Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          images: {
            $each: images,
          },
        },
      },
      { new: true },
      (err, event) => {
        if (err) return res.status(500).json({ error: err.message });

        Event.populate(event, { path: "forum" }, (err, newEvent) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json(newEvent);
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// upload event video or doc
exports.uploadEventMedia = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    let { type } = req.body;

    Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          [type]: req.file.filename || req.body.file || "",
        },
      },
      { new: true },
      (err, event) => {
        if (err) return res.status(500).json({ error: err.message });

        Event.populate(event, { path: "forum" }, (err, newEvent) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json(newEvent);
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete event image
exports.deleteEventImage = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { imageName } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: {
          images: imageName,
        },
      },
      { new: true }
    ).populate("forum");

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete event video or doc
exports.deleteEventMedia = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { type } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          [type]: "",
        },
      },
      { new: true }
    ).populate("forum");

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all events of a forum
exports.getEvents = async (req, res, next) => {
  try {
    const { forumId } = req.params;

    const events = await Event.find({ forum: forumId })
      .sort({ date: -1 })
      .populate("forum");

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get event by id
exports.getEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("forum");

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all events of a user's forums
exports.getUserEvents = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let user = await User.findById(userId);
    let forums = user.forums;

    const events = await Event.find({ forum: { $in: forums } })
      .sort({ date: -1 })
      .populate("forum");

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update event info
exports.updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { name, description, link, time, date, venue, forum } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          name,
          description,
          link,
          time,
          date,
          venue,
          forum,
        },
      },
      { new: true }
    );

    Event.populate(event, { path: "forum" }, (err, newEvent) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json(newEvent);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByIdAndDelete(eventId);

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
