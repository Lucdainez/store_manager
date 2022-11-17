const BODY_ADD_SALE = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const BODY_ADD_SALE_QUANTITY_0 = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 0
  }
];

const RESPONSE_SUCCESS_ADD_SALE = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const ALL_SALES = [
  {
    "saleId": 1,
    "date": "2022-11-17T16:21:55.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-17T16:21:55.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-17T16:21:55.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const REQUEST_SALE_ID_1 = [
  {
    "date": "2022-11-17T16:21:55.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-17T16:21:55.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const BODY_UPDATE_SALE = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const REQUEST_UPDATE_SALE = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
};

const BODY_UPDATE_SALE_WITHOUT_PRODUCTID = [
  {
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const BODY_UPDATE_SALE_WITHOUT_QUANTITY = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2
  }
]

module.exports = {
  BODY_ADD_SALE,
  RESPONSE_SUCCESS_ADD_SALE,
  ALL_SALES,
  REQUEST_SALE_ID_1,
  BODY_UPDATE_SALE,
  REQUEST_UPDATE_SALE,
  BODY_UPDATE_SALE_WITHOUT_PRODUCTID,
  BODY_UPDATE_SALE_WITHOUT_QUANTITY,
  BODY_ADD_SALE_QUANTITY_0,
};