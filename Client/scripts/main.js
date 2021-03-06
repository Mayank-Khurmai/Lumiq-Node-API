email_validate = (user_mail)=>{
  const validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (validRegex.test(user_mail)) {
      return true;
  }
  else {
      return false;
  }
}

openTab = (evt, tabName)=>{
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++)
  {
    tabcontent[i].style.display = "none";
  }

  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++)
  {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


request_login = (data)=>{
  let request_details = {
    method: 'POST',
    body: JSON.stringify(data)
  }
  let url = "http://localhost:8080/login";
  const ajaxHTTP = new XMLHttpRequest();
  ajaxHTTP.open("POST", url, true);
  ajaxHTTP.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        let uid = JSON.parse(this.responseText);
        uid = uid.message[0]._id;
        window.location.href = url+"/"+uid;
      }
      else{
        alert("Invalid Email & Password !");
      } 
}
  ajaxHTTP.send(JSON.stringify(request_details));
}

login = ()=>{
  let email = document.querySelector('input[name="login-field-1"]').value;
  let password = document.querySelector('input[name="login-field-2"]').value;

  let data = {
    'email' : email,
    'password' : password
  }

  if(email != ""){
      if(email_validate(email)){
        if(password != ""){
          request_login(data);
        }
        else{
          alert("Password cannot be empty");
        }
      }
      else{
        alert("Invalid Email !");
      }
  }
  else{
    alert("Email cannot be Empty !");
  }
}

request_registration = (data)=>{
  let request_details = {
    method: 'POST',
    body: JSON.stringify(data)
  }
  let url = "http://localhost:8080";

  fetch(url, request_details).then((response)=>{
      if(response.status == 409){
        alert("Email Already Exists !");
      }
      else{
        alert("Successfully Registered");
        document.querySelector(".tablinks").click();
      }
      return response.json();
  }).then((data)=>{
    console.log(data);
  });
}

register = ()=>{
  let name = document.querySelector('input[name="register-field-1"]').value;
  let email = document.querySelector('input[name="register-field-2"]').value;
  let mobile = document.querySelector('input[name="register-field-3"]').value;
  let address = document.querySelector('input[name="register-field-4"]').value;
  let password = document.querySelector('input[name="register-field-5"]').value;
  let c_password = document.querySelector('input[name="register-field-6"]').value;
  let gender;
  if(document.querySelector('input[name="register-field-7"]').checked)
    gender = "Male";
  else
    gender = "Female";

  let data = {
    'name' : name,
    'email' : email,
    'mobile' : mobile,
    'address' : address,
    'gender' : gender,
    'password' : password
  }

  if(password != ""){
    if(password == c_password && password !=""){
      if(name != ""){
        if(email_validate(email)){
          if(mobile.length == 10){
            if(address != ""){
                request_registration(data);
            }
            else{
              alert("Address cannot be empty");
            }
          }
          else{
            alert("Invalid Mobile");
          }
        }
        else{
          alert("Invalid Email");
        }
      }
      else{
        alert("Name cannot be empty");
      }
    }
    else{
      alert("Mis-match Password");
    }
  }
  else{
      alert("Password cannot be empty");
  }
}