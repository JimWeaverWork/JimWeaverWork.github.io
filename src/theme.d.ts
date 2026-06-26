import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    normal?: string;
    surface?: string;
    panel?: string;
    panelAlt?: string;
    light?: string;
    light2?: string;
    button?: string;
    buttondark?: string;
  }

  interface TypeText {
    muted?: string;
    light?: string;
    light2?: string;
    dark?: string;
  }
}
