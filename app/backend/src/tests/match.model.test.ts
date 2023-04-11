import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { matchesList, matchesListTrue } from './mocks/match.model.mock';

import { Response } from 'superagent';
import IMatch from '../database/Interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;
  afterEach(()=>{
    sinon.restore();
  })

  describe('Teste de integração de partidas', function () {
    it('Buscar todos as partidas com sucesso', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesList as unknown as Matches[])
     
      const response = await chai
        .request(app)
        .get('/matches');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesList);
    });


    it('Buscar todos as partidas em andamento com sucesso', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesListTrue as unknown as Matches[])
     
      const response = await chai
        .request(app)
        .get('/matches?inProgress=true');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesListTrue);
    });

    it('Finalizar uma partida em andamento com sucesso', async function () {
      sinon
        .stub(Matches, 'update')
        .resolves()
     
      const login = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
      
      const response = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjgwNzkzMDgwLCJleHAiOjE2ODEzOTc4ODB9.CJgh_6Tw1Vk3sjo9zxuICo-oBBzHlIsVzIOTQ5-pFcU');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ "message": "Finished" });
    });

  });
