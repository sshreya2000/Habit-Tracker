import { UserModel } from "../models/user.model.js";

export default class userController {
  // to add user
  async registerUser(req, res) {
    const { name, email } = req.body;
    const newUser = new UserModel({ name, email });
    await newUser.save();
    let errorMessage = null;
    if (!newUser) errorMessage = "Please enter correct name and email";
    return res.render("landing", {
      errorMessage,
    });
  }
  // to post login page
  async postLogin(req, res) {
    const { email } = req.body;
    const loginFound = await UserModel.findOne({ email });
    if (!loginFound)
      return res.render("landing", { errorMessage: "User not found" });
    req.session.userEmail = req.body.email;
    req.session.userName = loginFound.name;
    req.session.userId = loginFound._id;
    return res.redirect(`/habits/homePage`);
  }

  // to change view of habits
  async changeView(req, res) {
    console.log(req.params.view);
    let user = await UserModel.findById(req.session.userId);
    if (user) {
      user.view = req.params.view;
      await user.save();
    }
    res.redirect("/habits/homePage");
  }
  // to logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/landing");
    });
    res.clearCookie("lastVisit");
  }
}
