const signInInterface = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch("/sign-in", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if (data.isSuccess == false) {
                alert(data.message);
            } else {
                location.href = "http://localhost:4000/menu";
            }
        })
        .catch((err) => {
            console.log(err);
        });
};