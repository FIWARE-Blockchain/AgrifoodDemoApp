const app = require("../dist/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe("Server!", () => {
//test the status response from the IOTA
  it("welcomes to IOTA-FIWARE api server", done => {
    chai
      .request(app)
      .get("/status")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.appName).to.equals("IRI Devnet");
        expect(res.body.appVersion).to.equals("1.8.1");
        done();
      });
  });

//test post transation
  it("send transaction", done => {
    chai
      .request(app)
      .post("/transaction")
      .send({
        address: "ETJF9MZSDYTESOBJUANBCIYEVREVDNPNEJWEZDSBPUKTGOZKBNFD9DYQACJZW9EGQQHANBDGHJNUXTYVD",
        seed: "GUVMYGYLYVSKJ9AOPWJXB9V9WXEBUREGEDKJUPPMUQ9SXCYFGFXACEODXUVILVBMUZUDEJFPDSRXFSGNN",
        data: { message : "test transaction"}})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.hash).to.not.be.null;
        done();
      });
  });

//test fetch transation
it("fetch transaction", done => {
    chai
      .request(app)
      .get("/transaction/ETJF9MZSDYTESOBJUANBCIYEVREVDNPNEJWEZDSBPUKTGOZKBNFD9DYQACJZW9EGQQHANBDGHJNUXTYVD")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.hash).to.not.be.null;
        done();
      });
  });

//test post public transation
  it("send public mam transaction", done => {
    chai
      .request(app)
      .post("/mam")
      .send({
        mode: "public",
        secret: null,
        data: { message : "test transaction"}})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.hash).to.not.be.null;
        done();
      });
  });

//test post restricted transation
it("send restricted mam transaction", done => {
    chai
      .request(app)
      .post("/mam")
      .send({
        mode: "restricted",
        secret: "testing",
        data: { message : "test restricted transaction"}})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.hash).to.not.be.null;
        done();
      });
  });

//test fetch public transation
it("fetch public mam transaction", done => {
    chai
      .request(app)
      .post("/mam/fetch")
      .send({
        mode: "public",
        secret: null,
        hash: "9QBGGEEYGPNRZ9NQYBIVBNRJVPXWJUFHTKSRHOJZTNNKOBPBWGSXD9QRABWFDNP9VDOCRVHEIDPOWIUWC"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal('Super public message2');
        done();
      });
  });

//test fetch restricted transation
it("fetch restricted mam transaction", done => {
    chai
      .request(app)
      .post("/mam/fetch")
      .send({
        mode: "restricted",
        secret: "DONTSHARETHIS",
        hash: "QQUTOYQDKWGEOSNDERIUTLNFJLKXKPGMZVDJJJNPMSXSIYHJDUUMZUEI9GGQSFQJD9GRVGCMNDDATPWDN"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal('Super Secret Message');
        done();
      });
  });
});