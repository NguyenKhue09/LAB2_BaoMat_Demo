const Notifies = require("../models/notify.model");

/*
 */
async function GetNotifyNotRead(userId) {
  const notifies = await Notifies.find({ userId }, (err) => {
    if (!err) console.log("Find  admin successful!");
    else console.log("Find admin failed!");
  }).clone();

  return notifies;
}

/** */
async function AddNewNotify(data) {
  try {
    const newNotify = new Notifies(data);

    const saveNotify = await newNotify.save();

    if (saveNotify) console.log("Add new notify successful!");
    else console.log("Add new notify fail!");

    return saveNotify;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

/** */
async function UpdateNotify(data, notifyId) {
  try {
    const update = await Notifies.findOneAndUpdate(
      {
        _id: notifyId,
      },
      data
    );

    if (!update) throw "Update notify fail!";

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  GetNotifyNotRead,
  AddNewNotify,
  UpdateNotify,
};
