// Sell incoming --> if incoming contains sell for <= price than a buy in existingBook,
//    execute order
//  else
//    add to existingBook
// Buy incoming --> if incoming contains buy for >= price than a sell in existingBook, 
//    execute order
//  else
//    add to existingBook 

// Incoming sell order function

function reconcileSell(existingBook, incomingOrder) {
  let foundIndex = 0
  let reducedIncomingOrder = 0
  do {
    foundIndex = existingBook.findIndex(existingItem => existingItem.type === 'buy'
      && incomingOrder.price <= existingItem.price)

    if (foundIndex >= 0) {
      if (existingBook[foundIndex].quantity >= incomingOrder.quantity) {
        const reducedExistingOrder = existingBook[foundIndex]
        const { quantity } = existingBook[foundIndex]
        reducedExistingOrder.quantity -= incomingOrder.quantity
        // ln 26 stores qty of incoming order after its value is used to reduce a matching order's qty in 
        // existingBook, for while loop condition incomingOrder.quantity
        incomingOrder.quantity = incomingOrder.quantity - quantity > 0 ? incomingOrder.quantity - quantity : 0
        existingBook.splice(foundIndex, 1)
        if (reducedExistingOrder.quantity > 0) {
          existingBook.push(reducedExistingOrder)
        }
      } else if (existingBook[foundIndex].quantity < incomingOrder.quantity) {
        reducedIncomingOrder = incomingOrder
        reducedIncomingOrder.quantity -= existingBook[foundIndex].quantity
        existingBook.splice(foundIndex, 1)

      } else {
        existingBook.splice(foundIndex, 1)
      }
    }
  } while (foundIndex >= 0 && incomingOrder.quantity)


  if (incomingOrder.quantity) {
    existingBook.push(incomingOrder)
  }

  return existingBook
}

// Incoming buy order function

function reconcileBuy(existingBook, incomingOrder) {
  let foundIndex = 0
  let reducedIncomingOrder = 0
  do {
    foundIndex = existingBook.findIndex(existingItem => existingItem.type === 'sell'
      && incomingOrder.price >= existingItem.price)

    if (foundIndex >= 0) {
      if (existingBook[foundIndex].quantity >= incomingOrder.quantity) {
        const reducedExistingOrder = existingBook[foundIndex]
        const { quantity } = existingBook[foundIndex]
        reducedExistingOrder.quantity -= incomingOrder.quantity
        // see ln 24 comment 
        incomingOrder.quantity = incomingOrder.quantity - quantity > 0 ? incomingOrder.quantity - quantity : 0
        existingBook.splice(foundIndex, 1)
        if (reducedExistingOrder.quantity > 0) {
          existingBook.push(reducedExistingOrder)
        }
      } else if (existingBook[foundIndex].quantity < incomingOrder.quantity) {
        reducedIncomingOrder = incomingOrder
        reducedIncomingOrder.quantity -= existingBook[foundIndex].quantity
        existingBook.splice(foundIndex, 1)

      } else {
        existingBook.splice(foundIndex, 1)
      }
    }
  } while (foundIndex >= 0 && incomingOrder.quantity)


  if (incomingOrder.quantity) {
    existingBook.push(incomingOrder)
  }

  return existingBook
}

// Switch bt/w reconciling sell and buy orders

function reconcileOrder(existingBook, incomingOrder) {

  switch (incomingOrder.type) {
    case 'sell':
      return reconcileSell(existingBook, incomingOrder)
    case 'buy':
      return reconcileBuy(existingBook, incomingOrder)
  }
}
module.exports = reconcileOrder