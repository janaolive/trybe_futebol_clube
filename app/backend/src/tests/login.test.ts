import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userData = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  // senha: secret_admin
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

describe('Verifica /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userData as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica que o login é realizado', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password:'secret_admin' })
       const { token } = chaiHttpResponse.body;
       const { status } = chaiHttpResponse;
    expect(token).to.exist;
    expect(status).to.be.equal(200);
  });

  it('Confirma o envio do password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password:'' })
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
    expect(message).to.be.equal('All fields must be filled');
    expect(status).to.be.equal(400);
  });

    it('Valida a senha informada', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password:'123' })
      const { message } = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
    expect(message).to.be.equal('Incorrect email or password');
    expect(status).to.be.equal(401);
  });

  it('Confirma que a validação retorna status 200 para casos de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', token)
       .send()
       const { role } = chaiHttpResponse.body;
       const { status } = chaiHttpResponse;
    expect(role).to.be.equal('admin');
    expect(status).to.be.equal(200);
  });

  it('Confirma que a validação retorna status 404 para casos de erro', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', '')
       .send()
       const { message } = chaiHttpResponse.body;
       const { status } = chaiHttpResponse;
    expect(message).to.be.equal('token not found');
    expect(status).to.be.equal(404);
  });
});
