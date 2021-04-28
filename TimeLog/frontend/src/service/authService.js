import jwtDecode from "jwt-decode";
import http from "./http.service";
import { apiUrl } from "../config.json";
import axios from 'axios'

const apiEndpoint = apiUrl + "users/";
const tokenKey = "token";
let id = null
let userType = null

http.setJwt(getJwt());

export async function login(username, password) {
  let received  = await axios
      .post("http://localhost:8080/users/login", {username, password})
      .catch((error) => {
        console.error(error);
      }); 
  id = received.data.id
  userType = received.data.userType
  localStorage.setItem(tokenKey, received.data.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getUserType() {
  return userType
}

export function getUserID() {
  return id
}

export function setUserType(type) {
  userType = type
}

export function setUserID(userID) {
  id = userID
}

export async function logout() {
  const respond = await http.get(apiEndpoint + "logout");
  console.log("Logout" + respond);
  localStorage.clear();
  id = null
  userType = null
  //localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getUserID,
  getUserType,
  setUserID,
  setUserType
};

