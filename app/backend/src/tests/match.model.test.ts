// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Matches from '../database/models/Matches';
// import { matchesList } from './mocks/match.model.mock';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;
//   afterEach(()=>{
//     sinon.restore();
//   })

//   describe('Teste de integração de times', function () {
//     it('Buscar todos os times com sucesso', async function () {
//       sinon
//         .stub(Matches, 'findAll')
//         .resolves(matchesList)
     
//       const response = await chai
//         .request(app)
//         .get('/matches');
  
//       expect(response.status).to.be.equal(200);
//       expect(response.body).to.be.deep.equal(matchesList);
//     });
//   });
