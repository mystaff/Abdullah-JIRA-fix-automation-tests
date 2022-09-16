import csv from "csv-parser";
import fs from "fs";
import { faker } from "@faker-js/faker";
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

export async function updateCSV() {
  const csvWriter = createCsvWriter({
    path: "csv_users.csv",
    header: [
      { id: "name", title: "Name" },
      { id: "email", title: "Email" },
      { id: "password", title: "Password" },
      { id: "employee_id", title: "Employee ID (Optional)" },
    ],
  });
  let data: any[] = [];

  for (let i = 0; i < 11; i++) {
    data.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: "Timedoctor123!",
      employee_id: "",
    });
  }
  await csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
  fs.createReadStream("csv_users.csv")
    .pipe(csv())
    .on("data", (row) => {
      console.log(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}
