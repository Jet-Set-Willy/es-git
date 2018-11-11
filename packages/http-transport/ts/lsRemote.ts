import parseRefsResponse from "./parseRefsResponse";
import { Ref } from "./types";
import { Auth, authorization } from "./authorization";

export { Ref };

export interface Result {
  readonly capabilities: Map<string, string | boolean>;
  readonly remoteRefs: Ref[];
}

export type Fetch = (url: string, init?: RequestInit) => Promise<FetchResponse>;

export interface FetchResponse {
  text(): Promise<string>;
  readonly status: number;
  readonly statusText: string;
}

export default async function lsRemote(
  url: string,
  fetch: Fetch,
  service: string = "git-upload-pack",
  auth?: Auth
): Promise<Result> {
  const res = await fetch(`${url}/info/refs?service=${service}`, {
    method: "GET",
    headers: {
      "Content-Type": `application/x-${service}-request`,
      Accept: `application/x-${service}-result`,
      ...authorization(auth)
    }
  });
  if (res.status !== 200)
    throw new Error(
      `ls-remote failed with ${res.status} ${
        res.statusText
      }\n${await res.text()}`
    );
  const refs = await res.text();
  const capabilities = new Map<string, string | boolean>();
  const remoteRefs = [...parseRefsResponse(refs, service, capabilities)];
  return {
    remoteRefs,
    capabilities
  };
}
