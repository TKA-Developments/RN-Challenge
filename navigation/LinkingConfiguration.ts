import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              Todo: "one",
            },
          },
          TabTwo: {
            screens: {
              "Edit Todo": "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
