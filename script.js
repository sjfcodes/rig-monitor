const validIpRegEx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const addRigFormEl = document.getElementById("add-rig");
const dashboardList = document.getElementById("dashboard-list");

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

const deleteRigFromList = (ipAddress) => {
  const rigList = getRigList();
  const updatedList = rigList.filter((rig) => rig.ipAddress !== ipAddress);
  setRigList(updatedList);
  loadRigs();
};

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

  const iframe = document.createElement("iframe");
  iframe.src = "http://" + rig.ipAddress;
  iframe.width = "100%";
  iframe.height = "500px";
  dashboardList.appendChild(iframe);

  const deleteEl = document.createElement("button");
  deleteEl.textContent = "delete " + rig.ipAddress;
  iframe.classList.add("delete-rig");
  deleteEl.addEventListener("click", (e) => {
    e.preventDefault();
    deleteRigFromList(rig.ipAddress);
  });

  dashboardList.appendChild(deleteEl);
};

const loadRigs = () => {
  dashboardList.innerHTML = "";
  const rigList = getRigList();
  rigList.forEach(displayRig);
};

addRigFormEl.addEventListener("submit", addRigToList);
document.addEventListener("DOMContentLoaded", loadRigs);
