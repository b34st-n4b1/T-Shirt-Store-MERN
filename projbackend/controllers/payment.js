const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "hkncf6s2tsszmgfg",
  publicKey: "swjj44rpmm7skbzm",
  privateKey: "665e1eef28ec3d6f8d2c80f22b4afcb2",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
