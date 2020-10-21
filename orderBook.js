// const updatedBook = reconcileOrder(existingBook, incomingOrder)
function reconcileSell(existingBook, incomingOrder) {
  const foundIndex = existingBook.findIndex(existingItem => existingItem.type === 'buy'
    && incomingOrder.price <= existingItem.price)
  console.log(foundIndex)
  if (foundIndex >= 0) {
    if (existingBook[foundIndex].quantity > incomingOrder.quantity) {
      const reducedOrder = existingBook[foundIndex]
      reducedOrder.quantity -= incomingOrder.quantity
      existingBook.splice(foundIndex, 1)
      existingBook.push(reducedOrder)
    } else if (existingBook[foundIndex].quanity < incomingOrder.quantity) {
      incomingOrder.quanity -= existingBook[foundIndex]
      existingBook.push(incomingOrder)
      existingBook.splice(foundIndex, 1)
    } else {
      existingBook.splice(foundIndex, 1)
    }

  } else {
    existingBook.push(incomingOrder)
  }
  return existingBook
}

function reconcileBuy(existingBook, incomingOrder) {
  const foundIndex = existingBook.findIndex(existingItem => existingItem.type === 'sell'
    && incomingOrder.quantity <= existingItem.quantity
    && incomingOrder.price >= existingItem.price)
  console.log(foundIndex)
  if (foundIndex >= 0) {
    existingBook.splice(foundIndex, 1)
  } else {
    existingBook.push(incomingOrder)
  }
  return existingBook
}

function reconcileOrder(existingBook, incomingOrder) {

  switch (incomingOrder.type) {
    case 'sell':
      return reconcileSell(existingBook, incomingOrder)
    case 'buy':
      return reconcileBuy(existingBook, incomingOrder)
  }
}
module.exports = reconcileOrder

/*
 updatedBook.push(incomingOrder)
        // existingBook is an array [] and incomingOrder is an object {}
        // incomingOrder.type works for objects to return the type property ('sell')
        // for existingBook, call 1st element of an array existingBook[0], and then use .type
      } else if (existingBook[0].type == incomingOrder.type) {
        updatedBook.push(incomingOrder)
        // index set to zero for all properties b/c existingBook contains one object in an array
      } else if ((existingBook[0].quantity != incomingOrder.quantity) || (existingBook[0].price != incomingOrder.price)) {
        updatedBook.push(incomingOrder)
        // how do I check incomingOrder against ALL elements of existingBook??
      } else if (existingBook[0].type != incomingOrder.type && existingBook[0].quantity == incomingOrder.quantity && existingBook[0].price == incomingOrder.price) {
        // fulfills an order and removes the matching order
        for (let i = 0; i < existingBook.length; i++) {
          if (existingBook[i].type != incomingOrder.type && existingBook[i].quantity == incomingOrder.quantity && existingBook[i].price == incomingOrder.price) {
            existingBook.splice(i, (i + 1))
          }

        }
        */