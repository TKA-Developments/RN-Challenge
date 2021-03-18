import { Alert } from 'react-native';

export default (action: string, reason: any) => {
  Alert.alert(
    'Error',
    `Error when trying to ${action}. Reason: ${reason}`,
    [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ],
  );
};
