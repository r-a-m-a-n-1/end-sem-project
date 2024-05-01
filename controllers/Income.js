const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  const income = new IncomeSchema({
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
    
    await income.save();
    res.status(200).json({ message: "The income has been added." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncome = async (req, res) => {
    try {
      const incomes = await IncomeSchema.find().sort({createdAt: -1})
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({message: "Server Error."})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
    .then((response) => {
        res.status(200).json({message: "Income Deleted."});
    })
    .catch((error) => {
      res.status(500).json({message: "Server Error."});
    })
}