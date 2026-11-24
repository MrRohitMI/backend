const express = require("express");
const app = express();
const z = require("zod");
app.use(express.urlencoded({ extended: true }));

const postValidation = z.object({
  caption: z.string().max(2200).optional(),
  images: z.array(z.url()).min(1).max(10),
  visibility: z.enum(['public','followers','private']),
  location: z.string().max(100).optional(),
  tags: z.array(z.string().min(1).max(30)).max(30).optional()
}).strict();
app.post("/api/posts", (req, res) => {
  console.log(req.body);
  let validationData = postValidation.safeParse(req.body);
  if (validationData.success) {
    res.status(201).json({
      success: true,
      data: validationData.data,
      message: "post created successfully!",
    });
  } else {
    res.status(422).json({
        success: false,
        message: validationData.error.issues
    })
  }
});
app.listen(8000, () => {
  console.log("server is running on port 8000");
});
