import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

// product creation succeeds
// duplicate product name fails
// production deletion succeeds
// product update succeeds
// product without name fails
// product without price fails
