export const getDay = () => {
  const d = new Date().getDay();
  switch (d) {
    case 1:
      return {
        type: String,
        text: "Senin",
      };

    case 2:
      return {
        type: String,
        text: "Selasa",
      };
    case 3:
      return {
        type: String,
        text: "Rabu",
      };
    case 4:
      return {
        type: String,
        text: "Kamis",
      };
    case 5:
      return {
        type: String,
        text: "Jumat",
      };
    case 6:
      return {
        type: String,
        text: "Sabtu",
      };
    case 7:
      return {
        type: String,
        text: "Selasa",
      };

    default:
      return;
  }
};

const getTime = () => {
  const d = new Date().getDay();
  
};
