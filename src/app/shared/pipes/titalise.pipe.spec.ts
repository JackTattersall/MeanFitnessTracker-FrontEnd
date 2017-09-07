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

});
