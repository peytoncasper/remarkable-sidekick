import styled from "styled-components";
import {SimpleIcon} from "../FontAwesome/simple";



export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
  ::-webkit-app {
    region: no-drag;
  }
;`

export const OverlayButtonContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 30%;
  overflow: hidden;
  z-index: 3;
  ::-webkit-app {
    region: no-drag;
  }
`;

export const UploadLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  ::-webkit-app {
    region: no-drag;
  }
`;


export const FileUpload = styled.input`
  display: none;
  ::-webkit-app {
    region: no-drag;
  }
`;



