function actionLoginCheck() {
    if (document.loginForm.userId.value == "") {
        alert("아이디호를 입력하세요");
        return false;
    } else if (document.loginForm.userPw.value == "") {
        alert("비밀번호를 입력하세요");
        return false;
    } else {
        document.loginForm.action="/login";
        document.loginForm.submit();
    }
} 

// window.onpageshow = function(event) {
//     if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) {
//     // Back Forward Cache로 브라우저가 로딩될 경우 혹은 브라우저 뒤로가기 했을 경우
//     alert("발생!");
//     location.href="/monitoring";
//   }
// }
