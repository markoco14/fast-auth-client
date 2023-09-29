class JwtAdapter {
  public async get({
    payload,
  }: {
    payload: {
      username: string;
      password: string;
    };
  }): Promise<any> {
    console.log(payload)
    const res = await fetch(`http://localhost:8000/auth/token/`, {
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

  // public async refresh({ refresh }: { refresh: any }): Promise<any> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         refresh: refresh,
  //       }),
  //     }
  //   );

  //   if (!res.ok) {
  //     throw new Error("Unable to authorize. Please refresh the page.");
  //   }
  //   const jwt = await res.json();
  //   return jwt;
  // }
}

export const jwtAdapter = new JwtAdapter();
