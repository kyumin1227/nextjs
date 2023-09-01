"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const option = {
          method: "PATCH", // 수정은 PUT 또는 PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id, option)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastId = result.id;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          name="title"
          placeholder="title"
          value={title}
        />
      </p>
      <p>
        <textarea
          onChange={(e) => setBody(e.currentTarget.value)}
          name="body"
          placeholder="body"
          value={body}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="Update" />
      </p>
    </form>
  );
}
