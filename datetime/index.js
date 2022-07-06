//Show log
//  console.log("Hello world!!!");
//Alert Box
//  window.alert("Alert DOM");
//Pass value by ID
document.getElementById("demo").innerHTML = "I am DOM";
//Pass Value by Write Method
// document.write("Hello DOM");

function ChangeBg() {
  document.body.style.backgroundColor = "red";
}

function DisplayDate() {
  document.getElementById("demo").innerHTML = Date();
}

var mycar = {
  brand: ["frod"],
  model: [1],
  color: ["black"],
};

console.log("This is Brand : " + mycar.brand[0]);
console.log("This is Color : " + mycar["color"][0]);

function toThaiDateString(date) {
  let monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม.",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout("display_ct()", refresh);

  document.getElementById("Realtime").innerHTML =
    `วันที่ ${numOfDay} ${month} ${year}` +
    `<br />เวลา ${hour} : ${minutes} : ${second} น.`;
}

function display_ct() {
  var strcount;
  var x = new Date();
  var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getYear();
  x1 = x1 + " - " + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();

  tt = toThaiDateString(x);
  // tt = display_c();
}

display_ct();
