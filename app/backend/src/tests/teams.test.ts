import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamData = [{
  teamName: 'São Paulo',
}];

describe('Verifica /teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamData as Teams[]);
  });

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica que /teams retorna todos os times', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/teams')
       .send()
       const response = chaiHttpResponse.body;
       const { status } = chaiHttpResponse;
    expect(response).to.exist;
    expect(status).to.be.equal(200);
  });

  it('Verifica que /teams/:id retorna o time específico', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/teams/:id')
      .send()
      const [ teamData ] = chaiHttpResponse.body;
      const { status } = chaiHttpResponse;
    expect(teamData).to.exist;
    expect(status).to.be.equal(400);
  })
});