var toggle_state = [false, false, false, false];
var flash_state = [false, false, false, false];
let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialBegin?deviceName=BOLT8024485&baud=9600"
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
    "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialWrite?deviceName=BOLT8024485&data=" +
      pin
  );
  request.send();
  request.onload = () => {
    request = new XMLHttpRequest();
    if (flash_state[array_pin] == true) {
      request.open(
        "GET",
        "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialWrite?deviceName=BOLT8024485&data=F"
      );
    } else {
      request.open(
        "GET",
        "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialWrite?deviceName=BOLT8024485&data=S"
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
    "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialWrite?deviceName=BOLT8024485&data=" +
      pin
  );
  request.send();
  request.onload = () => {
    request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://cloud.boltiot.com/remote/7b713be9-20da-43cf-a1a5-d74884527f71/serialWrite?deviceName=BOLT8024485&data=T"
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
