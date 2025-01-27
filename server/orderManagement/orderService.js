const db = require('../database/dbConfig')

const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId

    try {
        const orders = []

        const ordersRef = db.collection('orders')
        const querySnapshot = await ordersRef.where('userId', '==', userId).get()

        if (querySnapshot.empty) return res.status(200).send({ message: 'No orders with this id!' })

        querySnapshot.forEach((doc) => {
            orders.push({
                id: doc.id,
                ...doc.data()
            })
        })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const postOrder = async (req, res) => {
    const order = req.body

    try {
        const ordersRef = db.collection('orders')
        const newOrderRef = await ordersRef.add(order)
        const orderDoc = await newOrderRef.get()

        // update stock
        for (const item of order.items) {
            const perfumeRef = db.collection('perfumes').doc(item.itemId)
            const perfumeDoc = await perfumeRef.get()
            const updatedStock = perfumeDoc.data().stock - item.quantity
            await perfumeRef.update({ stock: updatedStock })
        }

        res.status(201).json({
            id: orderDoc.id,
            ...orderDoc.data()
        })
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

module.exports = {
    getOrdersByUserId,
    postOrder
}
