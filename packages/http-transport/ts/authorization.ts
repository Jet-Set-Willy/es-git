export type Auth = { username: string; password: string } | { bearer: string };

export function authorization(auth?: Auth): {} {
  if (auth) {
    if ("bearer" in auth) {
      return {
        authorization: `Bearer ${auth.bearer}`
      };
    }
    return {
      authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`
    };
  } else {
    return {};
  }
}
