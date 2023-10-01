import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

class UserAdapter {
  public async get_me({cookieStore}: {cookieStore: ReadonlyRequestCookies}) {
    const accessToken = cookieStore.get('accessToken')?.value

    const res = await fetch("http://127.0.0.1:8000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }


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
