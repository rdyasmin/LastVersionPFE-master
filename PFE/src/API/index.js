export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};
export const getAdminStatic=()=>{
  return fetch("http://127.0.0.1:8000/api/admin/statique").then((res) => res.json());
};
export const getClient=()=>{
  return fetch("http://127.0.0.1:8000/api/admin/clients").then((res) => res.json());
};
export const getAnnonce=()=>{
  return fetch("http://127.0.0.1:8000/api/admin/annonces").then((res) => res.json());
};
export const getville=()=>{
  return fetch("http://127.0.0.1:8000/api/villes").then((res) => res.json());
};

export const gettreeannonce=()=>{
  return fetch("http://127.0.0.1:8000/api/admin/treeannonce").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
