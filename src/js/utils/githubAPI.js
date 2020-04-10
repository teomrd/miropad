export const getAuthenticatedUsersGists = token =>
  fetch("https://api.github.com/gists", {
    headers: {
      Authorization: `token ${token}`
    }
  }).then(response => {
    console.log("response", response);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });

export const getAuthToken = (code, state) =>
  fetch(`https://miropad.herokuapp.com/auth?state=${state}&code=${code}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseAsJson => {
      console.log(responseAsJson);
      return responseAsJson;
    });
