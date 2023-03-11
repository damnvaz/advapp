export function Loading(start) {
  if (start) {
    document.getElementById("loadingComponent").style.display = "table";
    return;
  }
  document.getElementById("loadingComponent").style.display = "none";
}
