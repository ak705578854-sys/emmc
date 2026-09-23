const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    userId: "POL361074",
    password: "test1234"
  })
});

const data = await response.json();
console.log(data);