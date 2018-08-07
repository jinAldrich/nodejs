
function onCreateAccount() {
    console.log('register按钮被点击');
    getValue();
}

function getValue() {
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("password").value;
    var confirmPwd = document.getElementById("confirm-pwd").value;
    console.log('email：' + email);
    console.log('pwd：' + pwd);
    console.log('confirmPwd：' + confirmPwd);
    var data = JSON.stringify({
        "email": email,
        "pwd":pwd
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://localhost:8000/doregister");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    console.log('data=' + data);
    xhr.send(data);
}

