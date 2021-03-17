// import React, { useCallback, useMemo, useState } from 'react';
// import { Animated } from 'react-native';
// import { View } from '../Themed';
//
// const useSetup = (dimensions: { width: number, height: number }) => {
//   const mario = useMemo(() => {
//     const {
//       width,
//       height,
//     } = dimensions;
//     const diagonal = Math.hypot(width, height);
//     const diagonalHalf = diagonal / 2;
//     const circles = [];
//
//     const angle = (2 * Math.PI) / numCircles;
//     for (let i = 0; i < numCircles; i++) {
//       const randomOffsetAngle = random(-angle * 0.4, angle * 0.4);
//       const randomOffsetDistance = random(0, circleDiameter);
//
//       const distance = diagonalHalf + circleDiameter + randomOffsetDistance;
//       const currentAngle = angle * i + randomOffsetAngle;
//       const x = Math.sin(currentAngle) * distance;
//       const y = Math.cos(currentAngle) * distance;
//
//       circles.push({
//         x: new Value(x),
//         y: new Value(y),
//       });
//     }
//     return circles;
//   }, [dimensions]);
//
//   return circles;
// };
//
// const useDraw = (circles) => {
//   const nativeCode = useMemo(() => {
//     const clock = new Clock();
//
//     const nativeCode = [cond(clockRunning(clock), 0, startClock(clock)), clock];
//
//     // gravity. We push cirlces to 0, 0
//     for (let i = 0; i < circles.length; i++) {
//       const circle = circles[i];
//
//       nativeCode.push(set(circle.x, add(circle.x, multiply(circle.x, -0.01))));
//       nativeCode.push(set(circle.y, add(circle.y, multiply(circle.y, -0.01))));
//     }
//
//     for (let i = 0; i < circles.length; i++) {
//       for (let j = i; j < circles.length; j++) {
//         const circleA = circles[i];
//         const circleB = circles[j];
//
//         const dx = sub(circleB.x, circleA.x);
//         const dy = sub(circleB.y, circleA.y);
//         const distanceBetweenCenters = sqrt(
//           add(multiply(dx, dx), multiply(dy, dy)),
//         );
//
//         const areOverlapping = lessThan(distanceBetweenCenters, circleDiameter);
//
//         const overlapDistance = sub(circleDiameter, distanceBetweenCenters);
//         const percentOverlap = divide(overlapDistance, circleDiameter);
//         const halfPercent = multiply(percentOverlap, 0.5);
//
//         nativeCode.push(
//           cond(areOverlapping, [
//             set(circleA.x, sub(circleA.x, multiply(dx, halfPercent))),
//             set(circleA.y, sub(circleA.y, multiply(dy, halfPercent))),
//             set(circleB.x, add(circleB.x, multiply(dx, halfPercent))),
//             set(circleB.y, add(circleB.y, multiply(dy, halfPercent))),
//           ]),
//         );
//       }
//     }
//
//     return block(nativeCode);
//   }, [circles]);
//
//   useCode(() => nativeCode, [nativeCode]);
// };
//
// export const useGravityAnimation = (dimensions: { width: number, height: number }) => {
//   const mario = useSetup(dimensions);
//   useDraw(mario);
//
//   return mario;
// };
//
// export const Circle = ({
//   translateX,
//   translateY,
// }) => (
//   <Animated.View
//     style={{
//       transform: [{ translateX }, { translateY }],
//       position: 'absolute',
//       width: 50,
//       height: 100,
//       borderWidth: 1,
//       backgroundColor: '#ff0000',
//     }}
//   />
// );
//
// const Mario = ({ dimensions }: { dimensions: { width: number, height: number } }) => {
//   const mario = useGravityAnimation(dimensions);
//
//   return (
//     <View style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       overflow: 'hidden',
//     }}
//     >
//       {mario}
//     </View>
//   );
// };
//
// export default () => {
//   const [viewDimensions, setViewDimensions] = useState<{ width: number, height: number } | null>(null);
//   const handleLayout = useCallback((event: any) => {
//     const {
//       width,
//       height,
//     } = event.nativeEvent.layout;
//     setViewDimensions({
//       width,
//       height,
//     });
//   }, []);
//
//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//       onLayout={handleLayout}
//     >
//       <Mario viewDimensions={viewDimensions as NonNullable<typeof viewDimensions>} />
//     </View>
//   );
// };
