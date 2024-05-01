const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  const expense = new ExpenseSchema({
    title,
    amount,
    date,
    category,
    description
});

  try {
    if (!title || !amount || !category || !date || !description) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 && amount!==Number) {
      res.status(400).json({ message: "The amount entered should be positive" });
    }
    
    await expense.save();
    res.status(200).json({ message: "The expense has been added." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};

exports.getExpense = async (req, res) => {
    try {
      const expense = await ExpenseSchema.find().sort({createdAt: -1})
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({message: "Server Error."})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
    .then((response) => {
        res.status(200).json({message: "Expense Deleted."});
    })
    .catch((error) => {
      res.status(500).json({message: "Server Error."});
    })
}