class JwtAdapter {
  public async get({
    payload,
  }: {
    payload: {
      username: string;
      password: string;
    };
  }): Promise<any> {
    const res = await fetch(`http://localhost:8000/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: payload.username,
        password: payload.password,
      }),
    });

    if (!res.ok) {
      throw new Error("Unable to authorize");
    }
    const jwt = await res.json();
    return jwt;
  }

  public async refresh({ access_token, refresh_token }: { access_token: any; refresh_token: any }): Promise<any> {
    const res = await fetch(`http://localhost:8000/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // I think the authorization should be the access_token
        // at least for consistency
        // although the refresh token would have this info
        Authorization: `Bearer ${access_token}`,
        "refresh-token": `${refresh_token}`
      },
      // no body for now
      // can see about headers vs body for sending refresh token
      // body: JSON.stringify({
      //   refresh: refresh_token,
      // }),
    });

    if (!res.ok) {
      throw new Error("Unable to authorize. Please refresh the page.");
    }
    const jwt = await res.json();
    return jwt;
  }
}

export const jwtAdapter = new JwtAdapter();
