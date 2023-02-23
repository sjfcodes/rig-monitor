const validIpRegEx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const addRigFormEl = document.getElementById("add-rig");

const addRigToList = (e) => {
  e.preventDefault();
  const rigList = getRigList();
  const location = document.getElementById("rig-location").value;
  const ipAddress = document.getElementById("rig-ip-address").value;

  if (!validIpRegEx.test(ipAddress)) return;
  if (rigList.map((rig) => rig.ipAddress).includes(ipAddress)) return;

  const newRig = { location, ipAddress };

  rigList.push(newRig);
  setRigList(rigList);
  displayRig(newRig);

  document.getElementById("rig-ip-address").value = "192.168.68.x";
};

const deleteRigFromList = () => {};

const setRigList = (rigList) => {
  if (!rigList) return;
  localStorage.setItem("rig-list", JSON.stringify(rigList));
};

const getRigList = () => {
  return JSON.parse(localStorage.getItem("rig-list")) || [];
};

const displayRig = (rig) => {
  if (!rig.ipAddress) return;
  if (!rig.location) return;

  const el = document.createElement("iframe");
  el.src = 'http://' + rig.ipAddress;
  el.width = '100%';
  el.height = '500px'
  document.body.appendChild(el);
};

const loadRigs = () => {
  const rigList = getRigList();
  rigList.forEach(displayRig);
};

addRigFormEl.addEventListener("submit", addRigToList);
document.addEventListener("DOMContentLoaded", loadRigs);
