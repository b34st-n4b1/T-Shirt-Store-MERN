const { Order, ProductCart } = require("../models/orders");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found!",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const oder = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrder = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order found in DB"
            })
        }
        res.order(order)
    })
}

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    error: "Cannot update order status!"
                })
            }
            res.json(order)
        }
    )
}