"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg-shop.jpg")' }}
    >
      <section className="bg-white/40 border rounded-2xl flex flex-col justify-center items-center p-10 backdrop-blur-md">
        <h1 className="font-bold text-2xl pb-10">Book management</h1>
        <Link href={"/books"}>
        <button className="text-white bg-blue-500 p-3 rounded-xl hover:cursor-pointer hover:bg-blue-700">
          เข้าสู่ร้านหนังสือ
        </button>
        </Link>
      </section>
    </div>
  );
}
