import {TitalisePipe} from './titalise.pipe';

describe('Titalise without a test bed', () => {
  let titalise: TitalisePipe;

  beforeEach((done) => {
    titalise = new TitalisePipe();
    done();
  });

  it('should return input with first letter capitalized', () => {
    const result = titalise.transform('test');
    expect(result).toEqual('Test');
  });

  it('should return input with first words first letter capitalized if more than one word entered', () => {
    const result = titalise.transform('test my test');
    expect(result).toEqual('Test my test');
  });

  it('should return empty string if empty string passed in', () => {
    const result = titalise.transform('');
    expect(result).toEqual('');
  })
});
