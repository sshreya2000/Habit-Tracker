import mongoose from "mongoose";
import { HabitModel } from "../models/habit.model.js";
import { UserModel } from "../models/user.model.js";

export default class habitController {
  async homePage(req, res) {
    try {
      // if user signin
      if (req.session.userId) {
        let habits = await HabitModel.find({
          user: new mongoose.Types.ObjectId(req.session.userId),
        });
        let user = await UserModel.findById(req.session.userId);
        console.log(user.view);
        // render home page with logged in user and assosiated habits
        return res.render("homePage", {
          errorMessage: null,
          userEmail: req.session.userEmail,
          userName: req.session.userName,
          userView: user.view,
          title: "Habit Tracker App",
          habits: habits,
          weeklyDate: getOneWeekDate(),
        });
      } else {
        // if user not logged in redirect to signin page
        return res.redirect("/landing");
      }
    } catch (err) {
      console.log(err);
    }
  }
  // to create habit
  async createHabit(req, res) {
    try {
      // find logged in user
      const user = await UserModel.findById(req.session.userId);
      // if habit exists
      const habit = await HabitModel.findOne({
        content: req.body.habit,
        user: new mongoose.Types.ObjectId(req.session.userId),
      });
      if (!user)
        return res.render("homePage", {
          errorMessage: "User Not Found!",
        });
      if (habit)
        return res.render("homePage", {
          errorMessage: "Habit already exists!",
        });
      const newHabit = req.body.habit;
      console.log(newHabit);
      const createHabit = new HabitModel({
        habit: newHabit,
        user: new mongoose.Types.ObjectId(req.session.userId),
        dates: { date: await getTodayDate(), complete: "none" },
      });
      await createHabit.save();

      // redirect home
      return res.redirect("/habits/homePage");
    } catch (err) {
      console.log(err);
    }
  }
  // to change status of markings for a habit
  async changeStatusHabit(req, res) {
    try {
      const { id, date } = req.query;
      const habit = await HabitModel.findById(id);
      if (!habit)
        return res.render("homePage", {
          errorMessage: "Error updating Status!",
        });
      let dates = habit.dates;
      let found = false;
      const newDate = dates.findIndex((item) => {
        return item.date === date;
      });
      if (dates[newDate]) {
        if (dates[newDate].status === "yes") dates[newDate].status = "no";
        else if (dates[newDate].status === "none")
          dates[newDate].status = "yes";
        else if (dates[newDate].status === "no") dates[newDate].status = "none";
        else dates[newDate].status = "yes";
        found = true;
      }
      if (!found) {
        dates.push({ date, status: "yes" });
      }
      habit.dates = dates;
      await habit.save();
      return res.redirect("/habits/homePage");
    } catch (err) {
      console.log(err);
    }
  }
  // to add habit to favourites
  async addFavouriteHabit(req, res) {
    try {
      const { id } = req.query;
      const habit = await HabitModel.findById(id);
      if (!habit)
        return res.render("homePage", {
          errorMessage: "Habit not found!",
        });
      if (habit.favourite == false) habit.favourite = true;
      else habit.favourite = false;
      await habit.save();
      return res.redirect("/habits/homePage");
    } catch (err) {
      console.log(err);
    }
  }
  // to remove habit
  async removeHabit(req, res) {
    try {
      const { id } = req.query;
      const user = req.session.userId;
      const habits = await HabitModel.deleteMany({
        _id: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(user),
      });
      console.log(habits);
      return res.redirect("/habits/homePage");
    } catch (err) {
      console.log(err);
    }
  }
}

// get today date
function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}

// get dates of a week till date
function getOneWeekDate() {
  let arr = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    let mm = d.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    let dd = d.getDate();
    if (dd < 10) dd = "0" + dd;
    const yyyy = d.getFullYear();
    arr.push(dd + "/" + mm + "/" + yyyy);
  }
  return arr;
}
