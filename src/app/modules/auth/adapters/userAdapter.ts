class UserAdapter {
  public async create({
    payload,
  }: {
    payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }): Promise<any> {
    const res = await fetch(`http://localhost:8000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: payload.firstName,
        last_name: payload.lastName,
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
