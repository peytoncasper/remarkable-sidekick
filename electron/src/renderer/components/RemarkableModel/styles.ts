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
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
`;


export const FileUpload = styled.input`
  display: none;
`;



