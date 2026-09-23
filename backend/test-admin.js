const response = await fetch("http://localhost:5000/api/auth/admin-create-user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-admin-key": "kuch_bhi_random_secret_2"
  },
  body: JSON.stringify({
    name: "Test Police Station",
    email: "police1@test.com",
    password: "test1234",
    role: "police"
  })
});

const data = await response.json();
console.log(data);