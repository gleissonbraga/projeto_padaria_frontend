import {jwtDecode} from "jwt-decode";

export function validarToken(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token)
    const agora = Date.now() / 1000

    if (decoded.exp && decoded.exp < agora) {

      return false;
    }

    return true
  } catch (err) {
    return false
  }
}
