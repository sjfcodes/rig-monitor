const validIpRegEx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const addRigFormEl = document.getElementById("add-rig");

const addRigToList = (e) => {
  e.preventDefault();
  const rigList = getRigList();
  const location = document.getElementById("rig-location").value;
  const ipAddress = document.getElementById("rig-ip-address").value;

  if (!validIpRegEx.test(ipAddress)) return;
  if (rigList.map((rig) => rig.ipAddress).includes(ipAddress)) return;

  rigList.push({ location, ipAddress });
  setRigList(rigList);
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
const displayRigs = () => {
  const rigList = getRigList();
  console.log(rigList);
};

addRigFormEl.addEventListener("submit", addRigToList);
document.addEventListener("DOMContentLoaded", displayRigs);
