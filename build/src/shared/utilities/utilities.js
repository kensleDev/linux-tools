"use strict";
// export type Procedure = (...args: any[]) => void;
// export interface Options {
//   isImmediate: boolean;
// };
// export function debounce<F extends Procedure>(
//   func: F,
//   waitMilliseconds = 50,
//   options: Options = {
//     isImmediate: false,
//   }
// ): F {
//   let timeoutId: ReturnType<typeof setTimeout> | undefined;
//   return function(this: any, ...args: any[]) {
//     const context = this;
//     const doLater = () => {
//       timeoutId = undefined;
//       if (!options.isImmediate) {
//         func.apply(context, args);
//       }
//     };
//     const shouldCallNow = options.isImmediate && timeoutId === undefined;
//     if (timeoutId !== undefined) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(doLater, waitMilliseconds);
//     if (shouldCallNow) {
//       func.apply(context, args);
//     }
//   } as any;
// }
// export function debounce(func: Function, timeout: number) {
//   let timer: NodeJS.Timeout;
//   return (...args: any) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, timeout);
//   };
// }
// export function throttle(func: Function, timeout: number) {
//   let ready = true;
//   return (...args: any) => {
//     if (!ready) {
//       return;
//     }
//     ready = false;
//     func(...args);
//     setTimeout(() => {
//       ready = true;
//     }, timeout);
//   };
// }
//# sourceMappingURL=utilities.js.map