const Expense = require('../models/expense')

async function expensesIndex (req, res) {
  try {
    const expenses = await Expense.find()
    if (!expenses) throw new Error()
    console.log('This shouldnt reach here') // ! This is running despite there being no expenses in the database
    res.status(200).json(expenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function expensesCreate (req, res) {
  try {
    const createdExpense = await Expense.create(req.body)
    res.status(201).json(createdExpense)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function expensesShow (req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findById(expenseId)
    if (!expense) throw new Error()
    res.status(200).json(expense)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function expensesUpdate (req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      { new: true, runValidators: true }
    )
    if (!expense) throw new Error()
    res.status(202).json(expense)  
  } catch (err) {
    res.status(422).json(err)
  }
}

async function expensesDelete (req, res) {
  const expenseId = req.params.id
  try {
    await Expense.findByIdAndDelete(expenseId)
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  index: expensesIndex,
  create: expensesCreate,
  show: expensesShow,
  update: expensesUpdate,
  delete: expensesDelete
}