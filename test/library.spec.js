/* global describe, it, before */

import chai from 'chai';
import {Powderpuff} from '../lib/powderpuff.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of Powderpuff', () => {
  before(() => {
    lib = new Powderpuff();
  });
  // describe('when I need the name', () => {
  //   it('should return the name', () => {
  //     expect(lib.name).to.be.equal('Cat');
  //   });
  // });
});