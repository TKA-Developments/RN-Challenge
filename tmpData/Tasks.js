const tasksData = [
    {
        id: Date.now().toString(),
        task: "CS Group Project",
        categories: ["School", "Important"],
        date: new Date("2021-02-22"),
        completed: false,
    },
    {
        id: (Date.now() + 1).toString(),
        task: "Exercise",
        categories: ["Personal", "Important"],
        date: new Date("2021-02-22"),
        completed: false,
    },
    {
        id: (Date.now() + 2).toString(),
        task: "Practice Past Papers",
        categories: ["School", "Important"],
        date: new Date("2021-02-23"),
        completed: false,
    },
    {
        id: (Date.now() + 3).toString(),
        task: "Buy Groceries",
        categories: ["Personal"],
        date: new Date("2021-02-23"),
        completed: false,
    },
    {
        id: (Date.now() + 4).toString(),
        task: "Buy Vitamins",
        categories: ["Personal"],
        date: new Date("2021-02-24"),
        completed: false,
    },
];

export default tasksData;
