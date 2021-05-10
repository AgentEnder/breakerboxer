import { GlobPart } from './models/glob-part.model';

const singleCharacterTokens = ['*', '?', '!', '{', '}', '[', ']', ')', '|', '/', ',']; // not sure if needed currently, as most things could be part of a pattern.
const multiCharacterTokens = ['***', '**', '*(', '+(', '@(', '!(', '?(', '[!', '[^', '..'];
const illegalTokens = ['***', '('];

export const TokenDescriptorMap = {
  '*': 'Match any string',
  '?': 'Match a single character',
  '{': 'Match any part of the set',
  '}': 'Close set',
  '[': 'Begin Range',
  ']': 'End Range',
  ')': 'End Group',
  '|': 'Group separator',
  '/': 'Directory separator',
  '**': 'Globstar (recursive wildcard)',
  '*(': 'Match zero or more items from the group',
  '+(': 'Match one or more items from the group',
  '@(': 'Match exactly one item from the group',
  '!(': 'Match none of the items in the group',
  '?(': 'Match zero or one items in the group',
  '[!': 'Match no characters in the range',
  '[^': 'Match no characters in the range',
};

export const GroupCloseMap = {
  '*(': ')',
  '+(': ')',
  '@(': ')',
  '!(': ')',
  '?(': ')',
  '[!': ']',
  '[^': ']',
  '[': ']',
  '{': '}',
};

export const GroupSeparatorMap = {
  '*(': '|',
  '+(': '|',
  '@(': '|',
  '!(': '|',
  '?(': '|',
  '{': ',',
};

export function getGlobTokens(pattern: string): string[] {
  let position = 0;
  const queue = pattern.split('');
  const tokens = [];

  while (!(queue.length === 0)) {
    let next = queue.shift();
    let token: string;
    position += 1;

    multiCharacterTokens
      .filter((x) => x.startsWith(next))
      .forEach((x) => {
        const matcher = [next, ...queue.slice(0, x.length - 1)].join('');
        console.log(x, matcher);
        if (x === matcher) {
          token = x;
          queue.splice(0, matcher.length - 1);
        }
      });

    if (!token && singleCharacterTokens.includes(next)) {
      token = next;
    } else if (!token) {
      token = next;
      next = queue.shift();
      while (next) {
        const multiCharacterTokenIsNext =
          multiCharacterTokens.filter(
            (x) => x.startsWith(next) && [next, ...queue.slice(0, x.length - 1)].join('') === x
          ).length > 0;
        const singleCharacterTokenIsNext = singleCharacterTokens.includes(next);

        if (multiCharacterTokenIsNext || singleCharacterTokenIsNext) {
          queue.unshift(next);
          break;
        } else {
          token += next;
          next = queue.shift();
        }
      }
    }
    if (token) {
      if (illegalTokens.some((x) => x === token)) {
        throw `Unexpected illegal token at position ${position} in pattern`;
      }
      tokens.push(token);
      continue;
    }
  }

  return tokens;
}

export function parseGlobPattern(pattern: string): GlobPart[] {
  return parseGlobTokens(getGlobTokens(pattern));
}

export function parseGlobTokens(tokens: string[]): GlobPart[] {
  let parts: GlobPart[] = [];
  const tokensCopy = [...tokens];
  while (tokensCopy.length > 0) {
    console.log('Parsing Tokens', tokensCopy);
    const { parts: newParts, tokensConsumed } = internalParseTokens(tokensCopy);
    console.log({ newParts, tokensConsumed });
    parts = parts.concat(newParts);
    tokensCopy.splice(0, tokensConsumed);
  }
  return parts;
}

function internalParseTokens(
  tokens: string[],
  groupStartToken: string = undefined
): {
  parts: GlobPart[];
  tokensConsumed: number;
} {
  const parts: GlobPart[] = [];
  let consumption = 0;
  while (tokens.length) {
    if (tokens[0].includes('(') || tokens[0].includes('[') || tokens[0].includes('{')) {
      const match = matchGroup(tokens);
      parts.push(match);
      consumption += match.tokensConsumed;
      tokens.splice(0, match.tokensConsumed);
    } else if (Object.values(GroupCloseMap).includes(tokens[0])) {
      if (GroupCloseMap[groupStartToken] === tokens[0]) {
        return {
          parts,
          tokensConsumed: consumption + 1,
        };
      }
      throw `Unexpected closing tag ${tokens[0]}`;
    } else {
      // TODO: Add parsing for ranges + lists, consolidate characters down to one token if not inside a range.
      parts.push({
        description: TokenDescriptorMap[tokens[0]],
        innerParts: [],
        token: tokens[0],
      });
      tokens.splice(0, 1);
      consumption += 1;
    }
  }
  return {
    parts,
    tokensConsumed: consumption,
  };
}

function matchGroup(tokens: string[]): GlobPart & { tokensConsumed: number } {
  const description = TokenDescriptorMap[tokens[0]];
  const newTokens = internalParseTokens(tokens.slice(1), tokens[0]);
  let partIdx = 0;
  const parts: GlobPart[] = newTokens.parts.reduce(
    (pList: GlobPart[], part: GlobPart) => {
      if (part.token === GroupSeparatorMap[tokens[0]]) {
        pList.push({
          description: 'Group Segment',
          innerParts: [],
          token: '',
        });
        partIdx++;
      } else {
        pList[partIdx].innerParts.push(part);
      }
      return pList;
    },
    [
      {
        description: 'Group Segment',
        innerParts: [],
        token: '',
      },
    ]
  );
  return {
    token: tokens[0],
    description,
    innerParts: parts,
    tokensConsumed: newTokens.tokensConsumed + 1,
  };
}
