export interface ICheckBox {
  title: string;
  checkColor?: string;
  checked: boolean;
  onPress: () => void;
}