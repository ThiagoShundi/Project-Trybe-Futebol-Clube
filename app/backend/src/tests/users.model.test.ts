import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import { UserList } from './mocks/users.model.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
  afterEach(()=>{
    sinon.restore();
  })

  describe('Teste de integração de login', function () {
    it('Buscar o token após o login', async function () {
    //   sinon
    //     .stub(Users, 'findOne')
    //     .resolves(UserList[0] as unknown as Users)
     
      const response = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
  
      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.be.deep.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    });

    it('Retorna um erro ao faltar password ou email', async () => {
        const result: Response = (await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com' }));
    
    
        expect(result.status).to.be.equal(400);
        expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

    it('Retorna um erro ao inserir um email invalido ', async () => {
        const result: Response = (await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin', password: 'secret_admin' }));
    
    
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
      })

      it('Retorna um erro ao inserir um password invalido ', async () => {
        const result: Response = (await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password: 'secre' }));
    
    
        expect(result.status).to.be.equal(401);
        expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
      })
  });