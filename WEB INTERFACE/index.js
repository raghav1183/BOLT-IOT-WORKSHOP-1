var toggle_state = [false, false, false, false];
var flash_state = [false, false, false, false];
var YOUR_API_KEY="YOUR API KEY";//REPLACE WITH YOUR API KEY
var YOUR_DEVICE_ID="YOUR BOLT MODULE'S DEVICE ID";// REPLACE WITH YOUR BOLT MODULE'S DEVICE ID
let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialBegin?deviceName="+YOUR_DEVICE_ID+"&baud=9600"
);
request.send();
request.onload = () => {
  console.log(JSON.parse(request.response));
};
function flash(pin) {
  let array_pin = pin - 4;
  flash_state[array_pin] = !flash_state[array_pin];
  toggle_state[array_pin] = !flash_state[array_pin];
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialWrite?deviceName="+YOUR_DEVICE_ID+"&data=" +
      pin
  );
  request.send();
  request.onload = () => {
    request = new XMLHttpRequest();
    if (flash_state[array_pin] == true) {
      request.open(
        "GET",
        "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialWrite?deviceName="+YOUR_DEVICE_ID+"&data=F"
      );
    } else {
      request.open(
        "GET",
        "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialWrite?deviceName="+YOUR_DEVICE_ID+"&data=S"
      );
    }
    request.send();
    request.onload = () => {
      let response = JSON.parse(request.response);
      if (response.success == 0) alert("NOT RESPONDING");
      if (response.success == 1) {
        let element = pin - 3;
        document.getElementById("light-flash" + element).style.background =
          flash_state[array_pin] == true ? "gold" : "darkgrey";
        document.getElementById("light-toggle" + element).style.background =
          "darkgrey";
      }
    };
  };
}

function toggle(pin) {
  let array_pin = pin - 4;
  toggle_state[array_pin] = !toggle_state[array_pin];
  flash_state[array_pin] = !toggle_state[array_pin];
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialWrite?deviceName="+YOUR_DEVICE_ID+"&data=" +
      pin
  );
  request.send();
  request.onload = () => {
    request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://cloud.boltiot.com/remote/"+YOUR_API_KEY+"/serialWrite?deviceName="+YOUR_DEVICE_ID+"&data=T"
    );
    request.send();
    request.onload = () => {
      let response = JSON.parse(request.response);
      if (response.success == 0) alert("NOT RESPONDING");
      if (response.success == 1) {
        document.getElementById("light-toggle" + (pin - 3)).style.background =
          toggle_state[array_pin] == true ? "gold" : "darkgrey";
        document.getElementById("light-flash" + (pin - 3)).style.background =
          "darkgrey";
      }
    };
  };
}
