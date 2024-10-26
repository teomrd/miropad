import { wordParts } from './wordParts';

describe('wordParts', () => {
  it('should split the word into parts when match is in the middle of the word', () => {
    const res = wordParts('Replace', 'pla');
    expect(res).toEqual(['Re', 'pla', 'ce']);
  });

  it('should split the word into parts when in start with the matching part', () => {
    const res = wordParts('Replace', 're');
    expect(res).toEqual(['Re', 'place']);
  });

  it('should split the word into parts on another word', () => {
    const res = wordParts('Listing', 'ist');
    expect(res).toEqual(['L', 'ist', 'ing']);
  });

  it('should split the word into parts when at the end', () => {
    const res = wordParts('Doing', 'ng');
    expect(res).toEqual(['Doi', 'ng']);
  });

  it('should split the word into parts when more than one occurrences of the matching phrase', () => {
    const res = wordParts('NaLoNamana', 'na');
    expect(res).toEqual(['Na', 'Lo', 'Na', 'ma', 'na']);
  });
});
