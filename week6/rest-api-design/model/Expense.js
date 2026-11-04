const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("expenses", expenseSchema);
