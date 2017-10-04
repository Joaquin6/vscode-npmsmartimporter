import { expect } from 'chai';
import * as sut from '../src/dependencies-matcher';

suite.only('dependencies-matcher', () => {
  suite('wordBasedMatch', () => {
    suite('should return matches containing full word', () => {
      const dependencies = [
        'shell',
        'gulp',
        'gulp-shell',
        'express',
        'body-parser',
        'expect.js',
        'moment',
        'moment-timezone',
        'custom-plugin-react',
        'custom-react',
        'custom-plugin-preact',
        'react-dom',
      ];
      const testCases = [
        { searchWord: 'express', expectedMatches: ['express'] },
        { searchWord: 'expect', expectedMatches: ['expect.js'] },
        { searchWord: 'moment', expectedMatches: ['moment', 'moment-timezone'] },
        { searchWord: 'bodyParser', expectedMatches: ['body-parser'] },
        { searchWord: 'gulpShell', expectedMatches: ['gulp-shell'] },
        { searchWord: 'customReact', expectedMatches: ['custom-react', 'custom-plugin-react'] },
        { searchWord: 'reactDOM', expectedMatches: ['react-dom'] },
        { searchWord: 'unknownPackage', expectedMatches: [] },
      ];

      testCases.forEach((testCase) => {
        test(`search for "${testCase.searchWord}" should return [${testCase.expectedMatches}]`, () => {
          const result = sut.wordBasedMatch(testCase.searchWord, dependencies);
          expect(result).to.have.same.members(testCase.expectedMatches);
        });
      });
    });

    suite('exactMatch', () => {
      suite('should return matches containing exact', () => {
        const dependencies = [
          'assert', 'buffer', 'crypto', 'dns', 'fs', 'http', 'https', 'net', 'os', 'path', 'querystring',
          'readline', 'stream', 'tls', 'tty', 'dgram', 'url', 'util', 'v8', 'vm', 'zlib',
        ];
        const testCases = [
          { searchWord: 'fs', expectedMatches: ['fs'] },
          { searchWord: 'crypto', expectedMatches: ['crypto'] },
          { searchWord: 'readline', expectedMatches: ['readline'] },
          { searchWord: 'fsExtension', expectedMatches: [] },
        ];

        testCases.forEach((testCase) => {
          test(`search for "${testCase.searchWord}" should return [${testCase.expectedMatches}]`, () => {
            const result = sut.exactMatch(testCase.searchWord, dependencies);
            expect(result).to.have.same.members(testCase.expectedMatches);
          });
        });
      });
    });
  });
});
