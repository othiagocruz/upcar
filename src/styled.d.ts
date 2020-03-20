import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    lanes: {
      left: string;
      right: string;
      middle: string;
    };
  }
}
