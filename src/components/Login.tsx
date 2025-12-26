"use client";

import { useState, useEffect } from "react";
import { Check, Delete, ChevronRight } from "lucide-react";

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);

    // Focus management or just keypad clicks? Keypad clicks for mobile friendliness.

    const handlePress = (num: string) => {
        if (code.length < 4) {
            setCode((prev) => prev + num);
            setError(false);
        }
    };

    const handleDelete = () => {
        setCode((prev) => prev.slice(0, -1));
        setError(false);
    };

    const handleEnter = () => {
        if (code === "1234") { // Hardcoded for prototype
            onLogin();
        } else {
            setError(true);
            setTimeout(() => {
                setCode("");
                setError(false);
            }, 500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-sm">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-primary">明日香ハーフ<br />救護アプリ</h1>
                    <p className="text-gray-500">4桁のコードを入力してください</p>
                </div>

                {/* Code Display */}
                <div className="flex justify-center gap-4 mb-10">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${i < code.length
                                    ? error
                                        ? "bg-red-500 scale-125"
                                        : "bg-primary scale-110"
                                    : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePress(num.toString())}
                            className="h-20 rounded-2xl bg-white text-2xl font-semibold shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-gray-800"
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={handleDelete}
                        className="h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-all"
                    >
                        <Delete size={28} />
                    </button>
                    <button
                        onClick={() => handlePress("0")}
                        className="h-20 rounded-2xl bg-white text-2xl font-semibold shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-gray-800"
                    >
                        0
                    </button>
                    <button
                        onClick={handleEnter}
                        disabled={code.length !== 4}
                        className={`h-20 rounded-2xl flex items-center justify-center text-white text-xl font-bold active:scale-95 transition-all ${code.length === 4 ? "bg-primary shadow-lg shadow-purple-200" : "bg-gray-300"
                            }`}
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    Code: 1234 (Prototype)
                </p>
            </div>
        </div>
    );
}
