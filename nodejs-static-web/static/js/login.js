/**
 *
 * Created by yujin on 2018/7/31
 *
 */

document.getElementById("login-btn").addEventListener("click",()=>{
    console.log('login点击');
    window.location.href= './login.html';
},false);

document.getElementById("account-btn").addEventListener("click",()=>{
    console.log('register点击');
    window.location.href= './register.html';
},false);