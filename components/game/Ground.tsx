// import React, { useEffect, useRef } from 'react';
// import { Animated, Image } from 'react-native';
//
// export default ({ initX = 0 }: { initX: number }) => {
//   const posX = useRef(new Animated.Value(200)).current;
//
//   const run = () => {
//     Animated.timing(posX, {
//       toValue: initX - 200,
//       duration: 1000,
//       useNativeDriver: true,
//     })
//       .start(() => {
//         posX.setValue(initX + 200);
//         run();
//       });
//   };
//
//   useEffect(() => {
//     run();
//   }, []);
//
//   return (
//     <Animated.View
//       style={{
//         transform: [{
//           translateX: posX,
//         }],
//       }}
//     >
//       <Image source={require('../../assets/images/mario/ground.png')} />
//     </Animated.View>
//   );
// };
