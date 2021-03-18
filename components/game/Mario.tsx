// import React, {
//   ForwardedRef, useEffect, useRef, useState,
// } from 'react';
// import { Animated } from 'react-native';
// import SpriteSheet from 'rn-sprite-sheet';
//
// export default React.forwardRef((
//   props: {},
//   ref: ForwardedRef<{ doJump: () => void } | null>,
// ) => {
//   const [isJump, setIsJump] = useState(false);
//   const spritesheet = useRef<SpriteSheet | null>(null);
//   const jumpHeight = useRef(new Animated.Value(0)).current;
//
//   const walk = () => {
//     spritesheet.current?.play({
//       type: 'walk',
//       fps: 10,
//       loop: true,
//       // resetAfterFinish: true,
//     });
//     setIsJump(false);
//   };
//
//   const fall = () => {
//     spritesheet.current?.play({
//       type: 'fall',
//       fps: 1,
//       loop: true,
//     });
//     Animated.timing(jumpHeight, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     })
//       .start(walk);
//   };
//
//   const jump = () => {
//     spritesheet.current?.play({
//       type: 'jump',
//       fps: 1,
//       loop: true,
//     });
//
//     Animated.timing(jumpHeight, {
//       toValue: 5,
//       duration: 600,
//       useNativeDriver: true,
//     })
//       .start(fall);
//   };
//
//   useEffect(() => {
//     if (ref) {
//       ref.current = {
//         doJump: () => {
//           if (!isJump) {
//             setIsJump(true);
//             jump();
//           }
//         },
//       };
//     }
//   }, [ref, isJump]);
//
//   useEffect(() => {
//     spritesheet.current?.play({
//       type: 'walk',
//       fps: 10,
//       loop: true,
//       // resetAfterFinish: true,
//     });
//   }, []);
//
//   return (
//     <Animated.View
//       style={{
//         transform: [{
//           translateY: jumpHeight.interpolate({
//             inputRange: [0, 1, 2, 4, 5],
//             outputRange: [0, -50, -75, -87.5, -100],
//           }),
//         }],
//       }}
//     >
//       <SpriteSheet
//         ref={spritesheet}
//         source={require('../../assets/images/mario/spritesheet.png')}
//         columns={5}
//         rows={2}
//         // height={200} // set either, none, but not both
//         // width={100}
//         imageStyle={{ marginTop: -1 }}
//         animations={{
//           walk: [1, 2, 3, 4],
//           jump: [5],
//           fall: [6],
//         }}
//       />
//     </Animated.View>
//   );
// });
