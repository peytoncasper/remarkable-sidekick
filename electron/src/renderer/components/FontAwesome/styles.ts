import styled from "styled-components";
import {HTMLProps} from "react";

interface IconProps extends  HTMLProps<HTMLElement>{
    fontSize?: string
}

export const Icon = styled.i<IconProps>`
  font-size: ${(p) => {
    switch(p.fontSize) {
      default:
      case 'medium':
        return '20px';
      case 'large':
        return '24px';
      case 'x-large':
        return '30px';
    }
  }};
  cursor: pointer;
`

