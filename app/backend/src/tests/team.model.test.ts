import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import { teamsList } from './mocks/team.model.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
  afterEach(()=>{
    sinon.restore();
  })

  describe('Teste de integração de times', function () {
    it('Buscar todos os times com sucesso', async function () {
      sinon
        .stub(Teams, 'findAll')
        .resolves(teamsList)
     
      const response = await chai
        .request(app)
        .get('/teams');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsList);
    });

    it('Buscar um time pelo id com sucesso', async function () {
      sinon
        .stub(Teams, 'findByPk')
        .resolves(teamsList[0])
     
      const response = await chai
        .request(app)
        .get('/teams/1');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsList[0]);
    });
  });

