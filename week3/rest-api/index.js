const express = require("express");
const app = express();
const data = require("./MOCK_DATA.json");
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/api/users", (req, res) => {
  return res.json(data);
});
app.get("/users", (req, res) => {
  res.render("users", { data });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const accessToken = req.headers["access-token"];
    if (accessToken === "123456") {
      let id = Number(req.params.id);
      const user = data.filter((e) => e.id === id);
      return res.json(user);
    } else {
      return res.json("Access token is not valid");
    }
  })
  .patch((req, res) => {
    let id = Number(req.params.id);
    const user = data.find((e) => e.id === id);
    const { id: _, ...updated } = req.body;
    Object.assign(user, updated);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(data, null, 2), () => {
      return res.json(user);
    });
  })
  .delete((req, res) => {
    let id = Number(req.params.id);
    const user = data.find((e) => e.id === id);
    const updateData = data.filter((e) => e.id !== user.id);
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updateData, null, 2),
      () => {
        data.splice(0, data.length, ...updateData);
        return res.json(user);
      },
    );
  });
app.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  const user = data.filter((e) => e.id === id);
  res.render("user", { user });
});
app.post("/api/users", (req, res) => {
  let user = req.body;
  data.push({ id: data.length + 1, ...user });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, data) => {
    return res.json("user added!");
  });
});
app.listen("8000", () => {
  console.log("Server is running on port 8000");
});
