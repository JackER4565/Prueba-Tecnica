const { createCharge } = require('../controllers/chargesController');

describe('createCharge', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        source_id: 'source_id',
        amount: 100,
        description: 'Test charge',
        currency: 'MXN',
        device_session_id: 'device_session_id',
      },
      params: {
        id: 'customer_id',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    req.body.amount = null;
    await createCharge(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  it('should return 400 if id is missing in params', async () => {
    req.params.id = null;
    await createCharge(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Id can not be empty' });
  });

  it('should create a charge and return 200 if everything is valid', async () => {
    const openpay = {
      customers: {
        charges: {
          create: jest.fn((customerId, newCharge, callback) => {
            callback(null, {
              id: 'charge_id',
              customer_id: 'customer_id',
              order_id: 'order_id',
              description: 'Test charge',
              amount: 100,
              method: 'store',
              reference: 'reference',
              currency: 'MXN',
              barcode_url: 'barcode_url',
              url_store: 'url_store',
              authorization: 'authorization',
              operation_type: 'operation_type',
              transaction_type: 'transaction_type',
              status: 'status',
              conciliated: 'conciliated',
            }, 'response');
          }),
        },
      },
    };
    const db = {
      query: jest.fn((query, data, callback) => {
        callback(null, 'response');
      }),
    };

    global.openpay = openpay;
    global.db = db;

    await createCharge(req, res);

    expect(openpay.customers.charges.create).toHaveBeenCalledWith(
      'customer_id',
      {
        method: 'store',
        source_id: 'source_id',
        amount: 100,
        description: 'Test charge',
        currency: 'MXN',
        device_session_id: 'device_session_id',
      },
      expect.any(Function)
    );

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO charges SET ?',
      {
        id: 'charge_id',
        customer_id: 'customer_id',
        order_id: 'order_id',
        description: 'Test charge',
        amount: 100,
        method: 'store',
        reference: 'reference',
        currency: 'MXN',
        barcode_url: 'barcode_url',
        url_store: 'url_store',
        authorization: 'authorization',
        operation_type: 'operation_type',
        transaction_type: 'transaction_type',
        status: 'status',
        conciliated: 'conciliated',
      },
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Customer Charge Created Successfully',
      response: 'response',
    });
  });

  it('should return 500 if there is an error creating the charge in the database', async () => {
    const openpay = {
      customers: {
        charges: {
          create: jest.fn((customerId, newCharge, callback) => {
            callback(null, {
              id: 'charge_id',
              customer_id: 'customer_id',
              order_id: 'order_id',
              description: 'Test charge',
              amount: 100,
              method: 'store',
              reference: 'reference',
              currency: 'MXN',
              barcode_url: 'barcode_url',
              url_store: 'url_store',
              authorization: 'authorization',
              operation_type: 'operation_type',
              transaction_type: 'transaction_type',
              status: 'status',
              conciliated: 'conciliated',
            }, 'response');
          }),
        },
      },
    };
    const db = {
      query: jest.fn((query, data, callback) => {
        callback('error', null);
      }),
    };

    global.openpay = openpay;
    global.db = db;

    await createCharge(req, res);

    expect(openpay.customers.charges.create).toHaveBeenCalledWith(
      'customer_id',
      {
        method: 'store',
        source_id: 'source_id',
        amount: 100,
        description: 'Test charge',
        currency: 'MXN',
        device_session_id: 'device_session_id',
      },
      expect.any(Function)
    );

    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO charges SET ?',
      {
        id: 'charge_id',
        customer_id: 'customer_id',
        order_id: 'order_id',
        description: 'Test charge',
        amount: 100,
        method: 'store',
        reference: 'reference',
        currency: 'MXN',
        barcode_url: 'barcode_url',
        url_store: 'url_store',
        authorization: 'authorization',
        operation_type: 'operation_type',
        transaction_type: 'transaction_type',
        status: 'status',
        conciliated: 'conciliated',
      },
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Error creating Customer Charge',
      error: 'error',
    });
  });

  it('should create a charge successfully', async () => {
    await createCharge(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Customer Charge Created Successfully',
      // Add more assertions based on the expected structure of your response
    });

    // Check if Openpay's create method was called correctly
    expect(Openpay().customers.charges.create).toHaveBeenCalledWith(
      'customer_id',
      {
        source_id: 'source_id',
        amount: 100,
        description: 'Test charge',
        currency: 'MXN',
        device_session_id: 'device_session_id',
        method: 'store',
      },
      expect.any(Function)
    );
  });
});