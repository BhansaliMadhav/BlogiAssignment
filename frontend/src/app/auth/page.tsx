"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check-auth", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.isAuthenticated) {
          router.push("/dashboard"); //
        }
      } catch {
        console.log("User Authentication failed");
      }
    };

    checkAuth();
  }, [router]);

  const handleAuth = async () => {
    try {
      const endpoint = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert(isRegister ? "Registration successful!" : "Login successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {isRegister ? "Register" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <Button className="w-full" onClick={handleAuth}>
            {isRegister ? "Register" : "Login"}
          </Button>
          <p className="text-center text-sm mt-2">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? " Login here" : " Register here"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
