import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      green: string;
      white: string;
      darkGray: string;
      lightGray: string;
      whiteGray: string;
      red: string;
    };
  }
}
