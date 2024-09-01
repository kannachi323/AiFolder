let db;
const request = window.indexedDB.open("MyTestDatabase");

request.onerror = (event) => {
  console.error(`Database error: ${event.target.error?.message}`);
}

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
}

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("Database opened successfully");
};

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];


