const express = require("express");
const app = express();
const z = require("zod");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const postValidation = z
  .object({
    caption: z.string().max(2200).optional(),
    images: z.array(z.url()).min(1).max(10),
    visibility: z.enum(["public", "followers", "private"]),
    location: z.string().max(100).optional(),
    tags: z.array(z.string().min(1).max(30)).max(30)
    .refine((tags)=> new Set(tags).size === tags.length,{
      message: "no dublicate tags allowed"
    }).optional(),
  })
  .strict();
app.post("/api/posts", (req, res) => {
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
      message: validationData.error.issues,
    });
  }
});
const videoValidation = z
  .object({
    title: z.string().min(5).max(100),
    description: z.string().max(5000).optional(),
    category: z.enum([
      "education",
      "gaming",
      "music",
      "entertainment",
      "technology",
    ]),
    visibility: z.enum(["public", "private", "unlisted"]),
    tags: z.array(z.string().min(2).max(30)),
    ageRestriction: z.boolean().default(false),
  })
  .strict();
app.post("/api/videos", (req, res) => {
  let validationData = videoValidation.safeParse(req.body);
  if (validationData.success) {
    res.status(201).json({
      success: true,
      data: validationData.data,
      message: "video created sucessfully",
    });
  } else {
    res.status(422).json({
      success: false,
      message: validationData.error.issues,
    });
  }
});
const prefrenceValidation = z.object({
  language: z.enum(["en", "hi", "es", "fr", "de", "ja"]).optional(),
  quality: z.enum(["auto", "low", "medium", "high"]).optional(),
  autoplay: z.boolean().optional(),
  subtitle: z.boolean().optional(),
  maturityLevel: z.enum(["kids", "teen", "adult"]).optional(),
});
app.patch("/api/users/preferences", (req, res) => {
  let validationData = prefrenceValidation.safeParse(req.body);
  if (validationData.success) {
    res.status(201).json({
      success: true,
      data: validationData.data,
      message: "prefrence updated successfully",
    });
  } else {
    res.status(422).json({
      success: true,
      message: validationData.error.issues,
    });
  }
});
const jobsValidation = z.object({
  title: z.string().min(3).max(100),
  company: z.string().min(2).max(100),
  description: z.string().min(50).max(5000),
  location: z.string().min(2).max(100),
  workMode: z.enum(["remote", "hybrid", "onsite"]),
  employmentType: z.enum(["full-time", "part-time", "internship", "contract"]),
  salary: z
    .object({
      min: z.number().min(1),
      max: z.number().min(1),
      currency: z.enum(["INR", "USD", "EUR"]),
    })
    .refine((data) => data.max >= data.min, {
      message: "Maximum salary cannot be less than minimum salary",
      path: ["max"],
    }),
  skills: z
    .array(z.string().min(2).max(50))
    .min(1)
    .max(20)
    .refine((skills) => new Set(skills).size === skills.length, {
      message: "Duplicate skills are not allowed",
    }),
});
app.post("/api/jobs", (req, res) => {
  let validationData = jobsValidation.safeParse(req.body);
  if (validationData.success) {
    res.status(201).json({
      success: true,
      data: validationData.data,
      message: "job post created successfully",
    });
  } else {
    res.status(422).json({
      success: false,
      message: validationData.error.issues,
    });
  }
});
app.listen(8000, () => {
  console.log("server is running on port 8000");
});
