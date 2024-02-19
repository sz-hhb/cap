import lwRequest from "./index"

export function binGet() {
  return lwRequest.get({
    url: "/get",
    data: {}
  })
}
