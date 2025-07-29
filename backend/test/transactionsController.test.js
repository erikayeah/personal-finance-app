const { getAllTransactions } = require("../controllers/transactionsController");

describe("getAllTransactions", () => {
  it("should return all transactions", async () => {
    const mockCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([{ type: "income", amount: 100 }]),
      }),
    };

    const mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };

    await getAllTransactions(mockCollection, mockRes);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify([{ type: "income", amount: 100 }])
    );
  });
});

const { createTransaction } = require("../controllers/transactionsController");

describe("createTransaction", () => {
  it("should insert a transaction and respond with 201", async () => {
    const fakeBody = JSON.stringify({
      type: "expense",
      amount: 99,
      description: "Snacks",
    });

    const mockReq = {
      method: "POST",
      on: (event, callback) => {
        if (event === "data") callback(Buffer.from(fakeBody));
        if (event === "end") callback();
      },
    };

    const mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };

    const mockCollection = {
      insertOne: jest.fn().mockResolvedValue({
        ops: [{ ...JSON.parse(fakeBody), date: expect.any(Date) }],
      }),
    };

    await createTransaction(mockReq, mockRes, mockCollection);

    expect(mockCollection.insertOne).toHaveBeenCalled();
    expect(mockRes.writeHead).toHaveBeenCalledWith(201, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalled();
  });
});

it("should return 400 if JSON body is invalid", async () => {
  const invalidBody = "{ type: 'expense', amount: 99 "; // intentionally broken

  const mockReq = {
    method: "POST",
    on: (event, callback) => {
      if (event === "data") callback(Buffer.from(invalidBody));
      if (event === "end") callback();
    },
  };

  const mockRes = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };

  const mockCollection = {
    insertOne: jest.fn(), // won't be called in this case
  };

  await createTransaction(mockReq, mockRes, mockCollection);

  expect(mockCollection.insertOne).not.toHaveBeenCalled();
  expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
    "Content-Type": "application/json",
  });
  expect(mockRes.end).toHaveBeenCalledWith(
    JSON.stringify({ error: "Invalid request body" })
  );
});

const connectToDatabase = require("../db");

describe("MongoDB connection", () => {
  let client;

  it("should connect to the database", async () => {
    const db = await connectToDatabase();
    expect(db).toBeDefined();
    expect(typeof db.collection).toBe("function");

    client = db.client;
  });

  afterAll(async () => {
    if (client && client.close) {
      await client.close();
    }
  });
});
