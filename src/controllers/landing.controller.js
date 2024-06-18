// landing page
export async function landingPage(req, res) {
  return res.render("landing", {
    errorMessage: null,
    userEmail: req.session.userEmail,
    userName: req.session.userName,
  });
}
