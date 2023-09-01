"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  // param을 받아오기 위해 useParams 이용
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  console.log(params);

  return (
    <>
      <ul>
        <li>
          <Link href="/create">Create</Link>
        </li>
        {id ? (
          <>
            <li>
              <Link href={"/update/" + id}>Update</Link>
            </li>
            <li>
              <input
                onClick={() => {
                  const options = { method: "DELETE" };
                  fetch(
                    process.env.NEXT_PUBLIC_API_URL + "topics/" + id,
                    options
                  )
                    .then((res) => res.json())
                    .then((result) => console.log(result));
                  router.push("/");
                  router.refresh();
                }}
                type="button"
                value="delete"
              />
            </li>
          </>
        ) : null}
      </ul>
    </>
  );
}
