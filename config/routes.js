const router = require('express').Router()
const auth = require('../controllers/auth')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')
const expenses = require('../controllers/expenses')
const balance = require('../controllers/balances')

router.route('/expenses')
  .get(expenses.index)
  .post(expenses.create)

router.route('/expenses/:id')
  .get(expenses.show)
  .post(expenses.update)
  .delete(expenses.delete)
  .put(secureRoute, expenses.accept)
  .patch(secureRoute, expenses.settle)

router.route('/users/expenses/owedto')
  .get(secureRoute, expenses.owedToExpenses)

router.route('/users/expenses/owedby')
  .get(secureRoute, expenses.owedByExpenses)

router.route('/users/expenses/requests/owedto')
  .get(secureRoute, expenses.pendingExpensesToUser)

router.route('/users/expenses/requests/owedby')
  .get(secureRoute, expenses.pendingExpensesToAccept)

router.route('/users/expenses/settled/owedto')
  .get(secureRoute, expenses.userSettledWithExpenses)

router.route('/users/expenses/settled/owedby')
  .get(secureRoute, expenses.userSettledExpenses)

router.route('/register')
  .post(auth.register)
	
router.route('/login')
  .post(auth.login)
	
router.route('/users')
  .get(users.index)

router.route('/usersnames')
  .get(users.showUsersAndIds)

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete)
  
router.route('/users/:id/friends')
  .get(secureRoute, users.showUserFriends) //* <-- Just added an s in users 

router.route('/users2/:id/friends')
  .get(secureRoute, users.showUserFriends2) //* <-- Just added an s in users 


router.route('/users/:id/friends/requests')
  .get(users.friendRequestsShow)
  .post(secureRoute, users.friendRequestCreate)
	
router.route('/users/:id/friends/requests/:requestId')
  .put(secureRoute, users.friendRequestAccept)
  .delete(secureRoute, users.rejectRequest)

router.route('/users/:id/balance')
  .get(balance.show)
  .put(balance.change)


	

module.exports = router