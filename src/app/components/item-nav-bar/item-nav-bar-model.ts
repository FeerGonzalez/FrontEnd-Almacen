export interface ItemNavBar {
  label: string;
  enlace?: string;
  childs?: [
    {
      label: string;
      enlace: string;
    }
  ];
}
