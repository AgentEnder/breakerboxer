import { GlobPart } from './models/glob-part.model';

// const singleCharacterTokens = ['*', '?', '!', '{', '}', '[', ']', ')', '|']; // not sure if needed currently, as most things could be part of a pattern.
const multiCharacterTokens = ['***', '**', '*(', '+(', '@(', '!(', '?(', '[!', '[^'];
const illegalTokens = ['***', '('];

export function glob101Util(): string {
  return 'glob101-util';
}

export function getGlobTokens(pattern: string): string[] {
  let position = 0;
  const queue = pattern.split('');
  const tokens = [];

  while (!(queue.length === 0)) {
    const next = queue.shift();
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
    token = token || next;
    if (token) {
      if (illegalTokens.some((x) => x === token)) {
        throw `Unexpected illegal token at position ${position} in pattern`;
      }
      tokens.push(token);
      console.log({ queue });
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
  tokens: string[]
): {
  parts: GlobPart[];
  tokensConsumed: number;
} {
  const parts: GlobPart[] = [];
  let consumption = 0;
  while (tokens.length) {
    if (tokens[0].includes('(')) {
      const match = matchGroup(tokens);
      parts.push(match);
      consumption += match.tokensConsumed;
      tokens.splice(0, match.tokensConsumed);
    } else if (tokens[0] === ')') {
      return {
        parts,
        tokensConsumed: consumption + 1,
      };
    } else {
      // TODO: Add parsing for ranges + lists, consolidate characters down to one token if not inside a range.
      parts.push({
        description: '',
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
  let description: string;
  switch (tokens[0]) {
    case '@(':
      description = 'Matches one pattern in group';
      break;
    case '!(':
      description = 'Matches no pattern in group';
      break;
    case '?(':
      description = 'Matches zero or one pattern in group';
      break;
    case '*(':
      description = 'Matches zero or more patterns in group';
      break;
    case '+(':
      description = 'Matches one or more patterns in group';
      break;
    default:
      break;
  }
  const newTokens = internalParseTokens(tokens.slice(1));
  return {
    token: tokens[0],
    description,
    innerParts: newTokens.parts,
    tokensConsumed: newTokens.tokensConsumed + 1,
  };
}
