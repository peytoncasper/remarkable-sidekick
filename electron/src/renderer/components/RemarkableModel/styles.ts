import styled from "styled-components";
import {SolidIcon} from "../FontAwesome/solid";



export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  cursor: pointer;
;`

export const OverlayButtonContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 30%;
  overflow: hidden;
  z-index: 3;
`;

export const UploadLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  background: #08DAAD;
  
  :hover {
    background-color: #03C99E;
  }
`;


export const FileUpload = styled.input`
  display: none;
`;



