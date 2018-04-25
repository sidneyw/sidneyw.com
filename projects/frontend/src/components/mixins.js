import { css } from 'styled-components';

export const Center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullHeight = css`
  height: 100%;
`;

export const FullWidth = css`
  width: 100%;
`;

export const Fill = css`
  ${FullHeight} ${FullWidth};
`;

export const Rounded = css`
  border-radius: 5px;
`;

export const Light = css`
  font-weight: 100;
`;

export const Bold = css`
  font-weight: 800;
`;

// ------------------------------------
// Grid
// ------------------------------------

const thirdWidth = 32;
const thirdMargin = (100 - thirdWidth * 3) / 2;

export const Thirds = css`
  width: 100%;
  margin: 0;

  @media screen and (min-width: 48em) {
    margin: 0 ${thirdMargin}% ${thirdMargin}% 0;
    width: ${thirdWidth}%;

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
`;

// ------------------------------------
// Shadows
// ------------------------------------
export const ZDepth1 = css`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

export const ZDepth2 = css`
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.3);
`;

export const ZDepth3 = css`
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
    0 3px 5px -1px rgba(0, 0, 0, 0.3);
`;

export const ZDepth4 = css`
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.3);
`;
