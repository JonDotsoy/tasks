import ow from 'ow';
import { titlePredicate } from './preditactes';
import { expect } from 'chai';

describe('Util Predicates', () => {
  const titles = [
    'title',
    'd_title',
    'd_title12',
    'd2_title12',
    'd2title12',
    's12351adaw',
    'a',
    'g',
  ];

  const titlesThrow = [
    '_title',
    '12title',
    '_',
    '1',
  ]

  titles.forEach((title) => {
    it(`expect ${JSON.stringify(title)} is valid`, () => {
      ow(title, titlePredicate);
    });
  });

  titlesThrow.forEach((title) => {
    it(`expect ${JSON.stringify(title)} is throw`, () => {
      expect(() => {
        ow(title, titlePredicate);
      }).is.throw();
    });
  });
});
