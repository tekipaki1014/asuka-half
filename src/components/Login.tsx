"use client";

import { useState } from "react";
import { Delete, ArrowRight, Activity, ShieldCheck } from "lucide-react";

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);

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
        if (code === "1234") {
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
        <div className="login-container">
            <div className="login-card">
                {/* Header */}
                <div className="login-header">
                    <div className="login-icon">
                        <Activity size={32} />
                    </div>
                    <h1>明日香ハーフマラソン</h1>
                    <p>救護・情報共有アプリ</p>
                </div>

                {/* Code Input */}
                <div className="login-body">
                    <div className="code-label">
                        <ShieldCheck size={16} />
                        <span>アクセスコード（4桁）</span>
                    </div>

                    <div className="code-dots">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`code-dot ${i < code.length
                                        ? error
                                            ? "filled error"
                                            : "filled"
                                        : ""
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Keypad */}
                    <div className="keypad">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handlePress(num.toString())}
                                className="keypad-btn"
                            >
                                {num}
                            </button>
                        ))}
                        <button onClick={handleDelete} className="keypad-btn keypad-action">
                            <Delete size={22} />
                        </button>
                        <button
                            onClick={() => handlePress("0")}
                            className="keypad-btn"
                        >
                            0
                        </button>
                        <button
                            onClick={handleEnter}
                            disabled={code.length !== 4}
                            className={`keypad-btn keypad-enter ${code.length === 4 ? "ready" : ""}`}
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="login-footer">
                    <p>デモ用コード: <strong>1234</strong></p>
                </div>
            </div>
        </div>
    );
}
