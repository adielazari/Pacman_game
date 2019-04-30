toggle("Welcome");
  var Array_of_setting;
  var users = new Array();
  function userObject(username,password){
      this.username=username;
      this.password=password;
  }
  users.push(new userObject("a","a"));
  Randon_setting()
  // users[0]= new Array();
  // users[0][0]= "a";
  // users[0][1]= "a";
  // var i=1;
  /*validetion the register*/
  jQuery(function($) {
      var validation_holder;
      $("form#register_form input[name='submit']").click(function() {

      var validation_holder = 0;

          var fname 			= $("form#register_form input[name='fname']").val();
          var lname 			= $("form#register_form input[name='lname']").val();
          var email 			= $("form#register_form input[name='email']").val();
          var email_regex 	= /^[\w%_\-.\d]+@[\w.\-]+.[A-Za-z]{2,6}$/; // reg ex email check
          var user            = $("form#register_form input[name='user']").val();
          var password 		= $("form#register_form input[name='password']").val();
          var month 			= $("form#register_form select[name='bday']").val(); // month
          var day 			= $("form#register_form select[name='bday']").val(); // day
          var year 			= $("form#register_form select[name='bday']").val(); // year

          /* validation start */
          /**fname */
          if(fname == "") {
              $("span.val_fname").html("This field is required.").addClass('validate');
              validation_holder = 1;
          } else {
              var matches = fname.match(/\d+/g);
              if (matches != null ) {
                  $("span.val_fname").html("first name cant contain numbers.").addClass('validate');
                  validation_holder = 1;
              }
              else{
                  $("span.val_fname").html("");
              }
          }

          /**lname */

          if(lname == "") {
              $("span.val_lname").html("This field is required.").addClass('validate');
              validation_holder = 1;
          } else {
              var matches1 = lname.match(/\d+/g);
              if (matches1 != null) {
                  $("span.val_lname").html("last name cant contain numbers.").addClass('validate');
                  validation_holder = 1;
              }
              else{
                  $("span.val_lname").html("");
              }
          }

          /**email */
          if(email == "") {
              $("span.val_email").html("This field is required.").addClass('validate');
              validation_holder = 1;
          } else {
              if(!email_regex.test(email)){ // if invalid email
                  $("span.val_email").html("Invalid Email!").addClass('validate');
                  validation_holder = 1;
              } else {
                  $("span.val_email").html("");
              }
          }
          if(user == "") {
              $("span.val_user").html("This field is required.").addClass('validate');
              validation_holder = 1;
          }
          /**password */
          if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
              $("span.val_pass").html("8 letters , capital and lowercase letter and number").addClass('validate');
              validation_holder = 1;
          }
          else if(password == "") {
              $("span.val_pass").html("This field is required.").addClass('validate');
              validation_holder = 1;
          } else {
                  $("span.val_pass").html("");
          }


          if((month == "dd/mm/yyyy") || (day == "dd/mm/yyyy") || (year == "dd/mm/yyyy")) {
              $("span.val_bday").html("This field is required.").addClass('validate');
              validation_holder = 1;
          } else {
                  $("span.val_bday").html("");
              }
          if(validation_holder == 1) { // if have a field is blank, return false
              $("p.validate_msg").slideDown("fast");
              return false;
          }
          validation_holder = 0;
          // users.push(new user(user,password));
           users.push(new userObject(user,password));
          // users[i] = new Array();
          // users[i][0]=user;
          // users[i][1]=password;
          // i++;

          //localStorage.setItem("users",JSON.stringify(users));
          window.alert("You have been register successfully");
          //return true;
          toggle("Welcome")
          /* validation end */
      }); // click end
  }); // jQuery End
  /*adding to menu new "li"*/
  function addToMenu(userName) {
      var ul = document.getElementById("menu_ul");
      var li = document.createElement("li");
      li.setAttribute("id", "userId_li")
      li.appendChild(document.createTextNode(""+userName));
      ul.appendChild(li)
  }
  /*set random settings*/
  function Randon_setting(){
      document.getElementById("txtChar_up").value = "up arrow";
      document.getElementById("txtChar_down").value = "down arrow";
      document.getElementById("txtChar_right").value = "right arrow";
      document.getElementById("txtChar_left").value = "left arrow";
      var numOfBalls_1 = Math.floor(Math.random() * 40)+50;
      document.getElementById("numOfBalls").value = numOfBalls_1;
      var numOfMunsters_1 = Math.floor(Math.random() * 3)+1;
      document.getElementById("numOfMunsters").value = numOfMunsters_1;
      var five_points_1 = getRandomColor();
      document.getElementById("five_points").value = five_points_1;
      var fifteen_points_1 = getRandomColor();
      document.getElementById("fifteen_points").value = fifteen_points_1;
      var twenty_five_points_1 = getRandomColor();
      document.getElementById("twenty_five_points").value = twenty_five_points_1;
      var time = getRandonTime();
      document.getElementById("time_setting").value = time;
  }
  /*random time to timer*/
  function getRandonTime(){
      var s = Math.floor(Math.random() * 50)+10;
      var m = Math.floor(Math.random() * 50)+10;
      var h = Math.floor(Math.random() * 14)+10;

      return h + ":" + m + ":" + s;
  }
  /*get randon color*/
  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  /*valid setting*/
  function check_setting(){
      var Array_of_setting_check = [
          document.getElementById("txtChar_up").value,
          document.getElementById("txtChar_down").value,
          document.getElementById("txtChar_right").value,
          document.getElementById("txtChar_left").value,
          document.getElementById("numOfBalls").value,
          document.getElementById("numOfMunsters").value,
          document.getElementById("five_points").value,
          document.getElementById("fifteen_points").value,
          document.getElementById("twenty_five_points").value,
          document.getElementById("time_setting").value
      ]
      var isvalidCheck = true;
      //bolls 50 to 90
      var numOfBalls_2 = Array_of_setting_check[4];
      document.getElementById("warning1").textContent ="";
      if(numOfBalls_2 < 50 || numOfBalls_2 > 90){
          document.getElementById("warning1").textContent = " Number of balls have to be between 50 to 90";
          isvalidCheck =false;
      }
      //monster 1 to 3
      var numOfMunsters_2 =   Array_of_setting_check[5];
      document.getElementById("warning2").textContent="";
      if(numOfMunsters_2<1 || numOfMunsters_2>3){
          document.getElementById("warning2").textContent = " Number of munsters have to be between 1 to 3";
          isvalidCheck = false;
      }
      var up1 = Array_of_setting_check[0];
      var down1 = Array_of_setting_check[1];
      var rignt1 = Array_of_setting_check[2];
      var left1 = Array_of_setting_check[3];
      //play key diffrents
      document.getElementById("warning3").textContent="";
      if(up1 == down1 || up1 == rignt1 || up1 == left1 || down1 == rignt1 || down1 == left1 ||rignt1 == left1){
          document.getElementById("warning3").textContent = " Game keys cant be the same";
          isvalidCheck = false;
      }
      document.getElementById("warning4").textContent = "";
      for (let index = 0; index < Array_of_setting_check.length; index++) {
          if(Array_of_setting_check[index] == ""){
              isvalidCheck=false;
              document.getElementById("warning4").textContent = "Have to fill all the fields";
              break;
          }
      }
      document.getElementById("warning5").textContent = "";
      var time1 = document.getElementById("time_setting").value;
      time1 = time1.split(":");
      if(time1[0]<1){
          isvalidCheck=false;
          document.getElementById("warning5").textContent = "Game time must be at list 1 min";
      }
      if(isvalidCheck){
          saveSetting();
      }

  }
  function saveSetting(){
      var timeTosecVar = TimeTosec(document.getElementById("time_setting").value);
      // var timeTosecVar = timeTosec(document.getElementById("time_setting").value);


      Array_of_setting = [
          document.getElementById("txtChar_up").value,
          document.getElementById("txtChar_down").value,
          document.getElementById("txtChar_right").value,
          document.getElementById("txtChar_left").value,
          document.getElementById("numOfBalls").value,
          document.getElementById("numOfMunsters").value,
          document.getElementById("five_points").value,
          document.getElementById("fifteen_points").value,
          timeTosecVar];
          Array_of_setting_check =[];
          window.alert("Save succsesfuly");
          toggle("Welcome");
  }
  function TimeTosec(time){
      timeTosec=time.split(":");
      return timeTosec[0]*360 + timeTosec[1]*60 + timeTosec[2]*1;
  }
  /*Check if the user and the password are correct*/
  function configuration(){
      var isvalid= false;
      var userID= document.getElementById('userID').value;
      var pass = document.getElementById('psw').value;
      //var users = JSON.parse(localStorage.getItem("users"));
      for (var i = 0; i < users.length; i++) {
          if(users[i].username==userID && users[i].password==pass){
              isvalid=true;
              break;
          }
      }
      if(isvalid){
          document.getElementById("user_label").textContent=userID;
          toggle('Welcome');
          var targ = document.getElementById('Login_btn');
          targ.style.display = 'none';
          var targ = document.getElementById('Register_btn');
          targ.style.display = 'none';
          var targ = document.getElementById('play_btn');
          targ.style.display = 'block';
          var targ = document.getElementById('setting_btn');
          targ.style.display = 'block';
          var targ = document.getElementById('out_li');
          targ.style.display = 'block';
          var targ = document.getElementById('Register_li');
          targ.style.display = 'none';
          var targ = document.getElementById('Login_li');
          targ.style.display = 'none';
          //addToMenu(userID);
      }
      else{
          window.alert("your user or password not correct");
      }
  }

  function loadCan(){
      toggle("loadCanvas")
  }

  function Register(){
      toggle('Register');
  }

  function Login(){
      toggle('Login');
  }
  function Setting(){
      toggle ('Setting');

  }
  /*sign out from user*/
  function signOut(){
      toggle('Welcome');
          var targ = document.getElementById('Login_btn');
          targ.style.display = 'block';
          var targ = document.getElementById('Register_btn');
          targ.style.display = 'block';
          var targ = document.getElementById('play_btn');
          targ.style.display = 'none';
          var targ = document.getElementById('setting_btn');
          targ.style.display = 'none';
          var targ = document.getElementById('out_li');
          targ.style.display = 'none';
          var targ = document.getElementById('Register_li');
          targ.style.display = 'block';
          var targ = document.getElementById('Login_li');
          targ.style.display = 'block';
          document.getElementById("user_label").textContent="";
          toggle('Welcome');
          // var myList = document.getElementById('userId_li');
          // myList.innerHTML = '';

  }
  /*get key from keyboard by press*/
  function displayKeyCode(evt,id)
  {
  window.alert(id);
  var textBox = getObject(id);
  var charCode = (evt.which) ? evt.which : event.keyCode
  textBox.value = String.fromCharCode(charCode);
  if (charCode == 8) textBox.value = "backspace"; //  backspace
  if (charCode == 9) textBox.value = "tab"; //  tab
  if (charCode == 13) textBox.value = "enter"; //  enter
  if (charCode == 16) textBox.value = "shift"; //  shift
  if (charCode == 17) textBox.value = "ctrl"; //  ctrl
  if (charCode == 18) textBox.value = "alt"; //  alt
  if (charCode == 19) textBox.value = "pause/break"; //  pause/break
  if (charCode == 20) textBox.value = "caps lock"; //  caps lock
  if (charCode == 27) textBox.value = "escape"; //  escape
  if (charCode == 33) textBox.value = "page up"; // page up, to avoid displaying alternate character and confusing people
  if (charCode == 34) textBox.value = "page down"; // page down
  if (charCode == 35) textBox.value = "end"; // end
  if (charCode == 36) textBox.value = "home"; // home
  if (charCode == 37) textBox.value = "left arrow"; // left arrow
  if (charCode == 38) textBox.value = "up arrow"; // up arrow
  if (charCode == 39) textBox.value = "right arrow"; // right arrow
  if (charCode == 40) textBox.value = "down arrow"; // down arrow
  if (charCode == 45) textBox.value = "insert"; // insert
  if (charCode == 46) textBox.value = "delete"; // delete
  if (charCode == 91) textBox.value = "left window"; // left window
  if (charCode == 92) textBox.value = "right window"; // right window
  if (charCode == 93) textBox.value = "select key"; // select key
  if (charCode == 96) textBox.value = "numpad 0"; // numpad 0
  if (charCode == 97) textBox.value = "numpad 1"; // numpad 1
  if (charCode == 98) textBox.value = "numpad 2"; // numpad 2
  if (charCode == 99) textBox.value = "numpad 3"; // numpad 3
  if (charCode == 100) textBox.value = "numpad 4"; // numpad 4
  if (charCode == 101) textBox.value = "numpad 5"; // numpad 5
  if (charCode == 102) textBox.value = "numpad 6"; // numpad 6
  if (charCode == 103) textBox.value = "numpad 7"; // numpad 7
  if (charCode == 104) textBox.value = "numpad 8"; // numpad 8
  if (charCode == 105) textBox.value = "numpad 9"; // numpad 9
  if (charCode == 106) textBox.value = "multiply"; // multiply
  if (charCode == 107) textBox.value = "add"; // add
  if (charCode == 109) textBox.value = "subtract"; // subtract
  if (charCode == 110) textBox.value = "decimal point"; // decimal point
  if (charCode == 111) textBox.value = "divide"; // divide
  if (charCode == 112) textBox.value = "F1"; // F1
  if (charCode == 113) textBox.value = "F2"; // F2
  if (charCode == 114) textBox.value = "F3"; // F3
  if (charCode == 115) textBox.value = "F4"; // F4
  if (charCode == 116) textBox.value = "F5"; // F5
  if (charCode == 117) textBox.value = "F6"; // F6
  if (charCode == 118) textBox.value = "F7"; // F7
  if (charCode == 119) textBox.value = "F8"; // F8
  if (charCode == 120) textBox.value = "F9"; // F9
  if (charCode == 121) textBox.value = "F10"; // F10
  if (charCode == 122) textBox.value = "F11"; // F11
  if (charCode == 123) textBox.value = "F12"; // F12
  if (charCode == 144) textBox.value = "num lock"; // num lock
  if (charCode == 145) textBox.value = "scroll lock"; // scroll lock
  if (charCode == 186) textBox.value = ";"; // semi-colon
  if (charCode == 187) textBox.value = "="; // equal-sign
  if (charCode == 188) textBox.value = ","; // comma
  if (charCode == 189) textBox.value = "-"; // dash
  if (charCode == 190) textBox.value = "."; // period
  if (charCode == 191) textBox.value = "/"; // forward slash
  if (charCode == 192) textBox.value = "`"; // grave accent
  if (charCode == 219) textBox.value = "["; // open bracket
  if (charCode == 220) textBox.value = "\\"; // back slash
  if (charCode == 221) textBox.value = "]"; // close bracket
  if (charCode == 222) textBox.value = "'"; // single quote
  // var lblCharCode = getObject('spnCode');
  // lblCharCode.innerHTML = 'KeyCode:  ' + charCode;
  // return false;
  }
  function getObject(obj)
  {
  var theObj;
  if (document.all) {
  if (typeof obj=='string') {
  return document.all(obj);
  } else {
  return obj.style;
  }
  }
  if (document.getElementById) {
  if (typeof obj=='string') {
  return document.getElementById(obj);
  } else {
  return obj.style;
  }
  }
  return null;
  }

  /*change div by clicking on menu choise*/
  function toggle(target) {
      var menu_var = document.getElementsByClassName('menu_class');
      var targ = document.getElementById(target);
      var isVis = targ.style.display == 'block';

      if(!isVis){
          // hide all
          for (var i = 0; i < menu_var.length; i++) {
              menu_var[i].style.display = 'none';
          }
          // toggle current
          targ.style.display = isVis ? 'none' : 'block';
          if(target=="About"){
              toggleabout();
          }
      }
  }

  /*the about in the menu
  the options to esc from it*/
  function toggleabout(){
      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("close_about")[0];
      modal.style.display = "block";
      span.onclick = function() {
          modal.style.display = "none";
          toggle("Welcome")
      }
      /*out the era*/
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
              toggle("Welcome")
          }
      }
      /*escape*/
       document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
          modal.style.display = "none";
          toggle("Welcome")
       }
      })
  }
