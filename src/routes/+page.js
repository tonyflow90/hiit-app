// import { trainings, settings } from "$stores/stores";

// /** @type {import('./$types').PageLoad} */
// export async function load() {
//   return {
//     trainings: trainings.init(),
//     settings: settings.init(),
//     // items: loadT(),
//     promise: {
//       items: loadT(),
//     },
//   };
// }

// const timeout = 1000;
// const loadT = async () => {
//   return new Promise((resolve, reject) => {
//     let arr = [
//       {
//         name: "T1 Training 123 bla test",
//         pause_duration: 1,
//         current_step: 0,
//         steps: [
//           {
//             name: "S1",
//             duration: 2,
//           },
//           {
//             name: "S2",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//           {
//             name: "S3",
//             duration: 2,
//           },
//         ],
//       },
//       {
//         name: "T2",
//         pause_duration: 15,
//         current_step: undefined,
//         steps: [
//           {
//             name: "S1",
//             duration: 45,
//           },
//           {
//             name: "S1",
//             duration: 45,
//           },
//           {
//             name: "S1",
//             duration: 45,
//           },
//         ],
//       },
//       {
//         name: "T3",
//         pause_duration: 15,
//         current_step: undefined,
//         steps: [
//           {
//             name: "S1",
//             duration: 45,
//           },
//           {
//             name: "S1",
//             duration: 45,
//           },
//           {
//             name: "S1",
//             duration: 45,
//           },
//         ],
//       },
//     ];
//     setTimeout(() => resolve(arr), timeout);
//   });
// };
