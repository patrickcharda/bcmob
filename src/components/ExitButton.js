import { Pressable, Image, BackHandler } from 'react-native';

const ExitButton = () => {
  return (
    <Pressable onPress={() => BackHandler.exitApp()} style={{ position: 'absolute', right: 30, bottom: -10}}>
      <Image source={require('../../assets/exit-run.png')} style={{width: 30, height: 30}} />
    </Pressable>
  )
};

export default ExitButton;