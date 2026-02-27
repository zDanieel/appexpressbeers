import { Request, Response } from "express";
import { getAllBeers } from "@controllers/beers.controller";

// Mock del módulo con factory que permite reasignar
const mockQuery = jest.fn();
const mockRequest_ = jest.fn().mockReturnValue({ query: mockQuery });
const mockPool = { request: mockRequest_ };

jest.mock("@config/database", () => ({
  get poolPromise() {
    return Promise.resolve(mockPool); // getter que se evalúa cada vez
  },
}));

describe("getAllBeers Controller", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

  const mockResponse = {
    json: mockJson,
    status: mockStatus,
  } as unknown as Response;

  const mockRequest = {} as Request;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return beers successfully", async () => {
    const mockBeers = [
      { BeerId: 1, Name: "Aguila", IsActive: true },
      { BeerId: 2, Name: "Poker", IsActive: true },
    ];

    mockQuery.mockResolvedValue({ recordset: mockBeers });

    await getAllBeers(mockRequest, mockResponse);

    expect(mockJson).toHaveBeenCalledWith(mockBeers);
  });

  it("should return 500 if database throws error", async () => {
    mockQuery.mockRejectedValue(new Error("DB error"));

    await getAllBeers(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
