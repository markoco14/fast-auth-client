class UserAdapter {
  public async create({
    payload,
  }: {
    payload: {
      email: string;
      password: string;
    };
  }): Promise<any> {
    const res = await fetch(`http://localhost:8000/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    if (!res.ok) {
      throw new Error("Unable to authorize");
    }
    const user = await res.json();
    return user;
  }

}

export const userAdapter = new UserAdapter();
