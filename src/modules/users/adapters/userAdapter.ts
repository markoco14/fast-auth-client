import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { UserProfile } from "../entities/UserProfile";

class UserAdapter {
  public async get_me({
    cookieStore,
  }: {
    cookieStore: ReadonlyRequestCookies;
  }): Promise<UserProfile> {
    const accessToken = cookieStore.get("accessToken")?.value;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const user = res.json();

      return user;
    } catch (error) {
      throw error;
    }
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
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
