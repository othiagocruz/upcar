import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    lanes: {
      left: string;
      right: string;
      middle: string;
    };
  }
}
